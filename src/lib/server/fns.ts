import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { PLANS, type Course, type CourseProgress, type CourseSummary, type Exercise, type PastExam, type QcmQuestion, type QcmSubmitResult } from "@/lib/types";
import { ensureCatalogSeeded } from "./seed";
import {
  getActiveSubscription,
  getOrCreateProfile,
  mapFiliere,
  parseOptions,
  requireAdmin,
} from "./helpers";

export const getMe = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { getSessionUser } = await import("@/lib/auth/verify.server");
    const session = await getSessionUser();
    const profile = await getOrCreateProfile(context.userId, {
      displayName: session?.email ?? null,
      email: session?.email ?? null,
    });
    const subscription = await getActiveSubscription(context.userId);
    return { profile, subscription };
  });

export const listFilieres = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    await ensureCatalogSeeded();
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      slug: string;
      name: string;
      short_name: string;
      description: string;
    }>`select id, slug, name, short_name, description from filieres order by sort_order`;
    return rows.map(mapFiliere);
  });

export const updateProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { displayName: string }) => input)
  .handler(async ({ context, data }) => {
    const name = data.displayName.trim().slice(0, 80);
    if (name.length < 2) throw new Error("Indiquez un nom");
    const sql = await getSql();
    await sql`update profiles set display_name = ${name}, updated_at = now() where user_id = ${context.userId}`;
    return { ok: true as const };
  });

export const claimAdmin = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const admins = await sql<{ c: number }>`select count(*)::int as c from profiles where role = 'admin'`;
    if ((admins[0]?.c ?? 0) > 0) throw new Error("Un administrateur existe déjà");
    await sql`update profiles set role = 'admin', updated_at = now() where user_id = ${context.userId}`;
    return { ok: true as const };
  });

export const saveParcours = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { filiereId: number; niveau: number; semestre: number }) => input)
  .handler(async ({ context, data }) => {
    if (![1, 2].includes(data.niveau) || ![1, 2].includes(data.semestre)) {
      throw new Error("Niveau ou semestre invalide");
    }
    const sql = await getSql();
    const filiere = await sql<{ id: number }>`select id from filieres where id = ${data.filiereId}`;
    if (!filiere[0]) throw new Error("Filière inconnue");
    await getOrCreateProfile(context.userId, { displayName: null, email: null });
    await sql`
      update profiles
      set filiere_id = ${data.filiereId}, niveau = ${data.niveau}, semestre = ${data.semestre}, updated_at = now()
      where user_id = ${context.userId}
    `;
    return { ok: true as const };
  });

export const listSemesterCourses = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await ensureCatalogSeeded();
    const profile = await getOrCreateProfile(context.userId, { displayName: null, email: null });
    if (!profile.filiereId || !profile.niveau || !profile.semestre) return [];
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      slug: string;
      title: string;
      code: string;
      description: string;
      hours: number;
      sort_order: number;
      filiere_id: number;
      niveau: number;
      semestre: number;
    }>`
      select id, slug, title, code, description, hours, sort_order, filiere_id, niveau, semestre
      from courses
      where filiere_id = ${profile.filiereId} and niveau = ${profile.niveau} and semestre = ${profile.semestre}
      order by sort_order, id
    `;
    return rows.map(
      (r): CourseSummary => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        code: r.code,
        description: r.description,
        hours: r.hours,
        sortOrder: r.sort_order,
        filiereId: r.filiere_id,
        niveau: r.niveau,
        semestre: r.semestre,
      }),
    );
  });

export const getCourseBundle = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((input: { courseId: number }) => input)
  .handler(async ({ context, data }) => {
    await ensureCatalogSeeded();
    const sql = await getSql();
    const profile = await getOrCreateProfile(context.userId, { displayName: null, email: null });
    const sub = await getActiveSubscription(context.userId);
    const locked = profile.role !== "admin" && !sub;

    const rows = await sql<{
      id: number;
      slug: string;
      title: string;
      code: string;
      description: string;
      hours: number;
      sort_order: number;
      filiere_id: number;
      niveau: number;
      semestre: number;
      content: string;
      resume: string;
    }>`
      select id, slug, title, code, description, hours, sort_order, filiere_id, niveau, semestre, content, resume
      from courses where id = ${data.courseId}
    `;
    const c = rows[0];
    if (!c) throw new Error("Module introuvable");

    const course: Course = {
      id: c.id,
      slug: c.slug,
      title: c.title,
      code: c.code,
      description: c.description,
      hours: c.hours,
      sortOrder: c.sort_order,
      filiereId: c.filiere_id,
      niveau: c.niveau,
      semestre: c.semestre,
      content: locked ? "" : c.content,
      resume: locked ? "" : c.resume,
    };

    const qcmRows = await sql<{
      id: number;
      prompt: string;
      options: unknown;
      sort_order: number;
    }>`select id, prompt, options, sort_order from questions where course_id = ${c.id} and kind = 'qcm' order by sort_order, id`;

    const qcm: QcmQuestion[] = locked
      ? []
      : qcmRows.map((q) => ({
          id: q.id,
          prompt: q.prompt,
          options: parseOptions(q.options),
          sortOrder: q.sort_order,
        }));

    const exRows = await sql<{
      id: number;
      prompt: string;
      solution: string;
      sort_order: number;
    }>`select id, prompt, solution, sort_order from questions where course_id = ${c.id} and kind = 'exercice' order by sort_order, id`;

    const exercises: Exercise[] = locked
      ? []
      : exRows.map((e) => ({
          id: e.id,
          prompt: e.prompt,
          solution: e.solution,
          sortOrder: e.sort_order,
        }));

    const examRows = await sql<{
      id: number;
      title: string;
      year: number;
      content: string;
      correction: string;
    }>`select id, title, year, content, correction from past_exams where course_id = ${c.id} order by year desc`;

    const exams: PastExam[] = locked
      ? examRows.map((e) => ({ ...e, content: "", correction: "" }))
      : examRows;

    const pRows = await sql<{
      viewed_course: boolean;
      viewed_resume: boolean;
      viewed_exercises: boolean;
      viewed_qcm: boolean;
      viewed_exams: boolean;
      viewed_corrections: boolean;
      qcm_score: number | null;
      qcm_attempts: number;
      completed: boolean;
    }>`select viewed_course, viewed_resume, viewed_exercises, viewed_qcm, viewed_exams, viewed_corrections, qcm_score, qcm_attempts, completed
       from progress where user_id = ${context.userId} and course_id = ${c.id}`;
    const p = pRows[0];
    const progress: CourseProgress = {
      courseId: c.id,
      viewedCourse: p?.viewed_course ?? false,
      viewedResume: p?.viewed_resume ?? false,
      viewedExercises: p?.viewed_exercises ?? false,
      viewedQcm: p?.viewed_qcm ?? false,
      viewedExams: p?.viewed_exams ?? false,
      viewedCorrections: p?.viewed_corrections ?? false,
      qcmScore: p?.qcm_score ?? null,
      qcmAttempts: p?.qcm_attempts ?? 0,
      completed: p?.completed ?? false,
    };

    return { course, qcm, exercises, exams, progress, locked };
  });

async function upsertProgress(
  userId: string,
  courseId: number,
  patch: Partial<{
    viewed_course: boolean;
    viewed_resume: boolean;
    viewed_exercises: boolean;
    viewed_qcm: boolean;
    viewed_exams: boolean;
    viewed_corrections: boolean;
    qcm_score: number | null;
    qcm_attempts: number;
    completed: boolean;
  }>,
) {
  const sql = await getSql();
  await sql`
    insert into progress (user_id, course_id)
    values (${userId}, ${courseId})
    on conflict (user_id, course_id) do nothing
  `;
  if (patch.viewed_course) {
    await sql`update progress set viewed_course = true, updated_at = now() where user_id = ${userId} and course_id = ${courseId}`;
  }
  if (patch.viewed_resume) {
    await sql`update progress set viewed_resume = true, updated_at = now() where user_id = ${userId} and course_id = ${courseId}`;
  }
  if (patch.viewed_exercises) {
    await sql`update progress set viewed_exercises = true, updated_at = now() where user_id = ${userId} and course_id = ${courseId}`;
  }
  if (patch.viewed_qcm) {
    await sql`update progress set viewed_qcm = true, updated_at = now() where user_id = ${userId} and course_id = ${courseId}`;
  }
  if (patch.viewed_exams) {
    await sql`update progress set viewed_exams = true, updated_at = now() where user_id = ${userId} and course_id = ${courseId}`;
  }
  if (patch.viewed_corrections) {
    await sql`update progress set viewed_corrections = true, updated_at = now() where user_id = ${userId} and course_id = ${courseId}`;
  }
  if (patch.qcm_score != null) {
    await sql`update progress set qcm_score = ${patch.qcm_score}, updated_at = now() where user_id = ${userId} and course_id = ${courseId}`;
  }
  if (patch.qcm_attempts != null) {
    await sql`update progress set qcm_attempts = ${patch.qcm_attempts}, updated_at = now() where user_id = ${userId} and course_id = ${courseId}`;
  }
  const row = await sql<{
    viewed_course: boolean;
    viewed_resume: boolean;
    viewed_exercises: boolean;
    viewed_qcm: boolean;
    qcm_score: number | null;
  }>`select viewed_course, viewed_resume, viewed_exercises, viewed_qcm, qcm_score from progress where user_id = ${userId} and course_id = ${courseId}`;
  const r = row[0];
  const completed = Boolean(
    r?.viewed_course && r.viewed_resume && r.viewed_exercises && r.viewed_qcm && (r.qcm_score ?? 0) >= 50,
  );
  await sql`update progress set completed = ${completed}, updated_at = now() where user_id = ${userId} and course_id = ${courseId}`;
}

export const markProgress = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: {
      courseId: number;
      field: "course" | "resume" | "exercises" | "qcm" | "exams" | "corrections";
    }) => input,
  )
  .handler(async ({ context, data }) => {
    const sub = await getActiveSubscription(context.userId);
    const profile = await getOrCreateProfile(context.userId, { displayName: null, email: null });
    if (profile.role !== "admin" && !sub) throw new Error("Abonnement requis");
    const map = {
      course: { viewed_course: true },
      resume: { viewed_resume: true },
      exercises: { viewed_exercises: true },
      qcm: { viewed_qcm: true },
      exams: { viewed_exams: true },
      corrections: { viewed_corrections: true },
    } as const;
    await upsertProgress(context.userId, data.courseId, map[data.field]);
    return { ok: true as const };
  });

export const submitQcm = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { courseId: number; answers: { questionId: number; selectedIndex: number }[] }) => input)
  .handler(async ({ context, data }): Promise<QcmSubmitResult> => {
    const profile = await getOrCreateProfile(context.userId, { displayName: null, email: null });
    const sub = await getActiveSubscription(context.userId);
    if (profile.role !== "admin" && !sub) throw new Error("Abonnement requis");
    const sql = await getSql();
    const questions = await sql<{
      id: number;
      prompt: string;
      options: unknown;
      correct_index: number;
      explanation: string;
    }>`select id, prompt, options, correct_index, explanation from questions where course_id = ${data.courseId} and kind = 'qcm' order by sort_order, id`;

    const answerMap = new Map(data.answers.map((a) => [a.questionId, a.selectedIndex]));
    const prev = await sql<{ qcm_attempts: number }>`
      select qcm_attempts from progress where user_id = ${context.userId} and course_id = ${data.courseId}
    `;
    const attempt = (prev[0]?.qcm_attempts ?? 0) + 1;

    let correctCount = 0;
    const items = [];
    for (const q of questions) {
      const selected = answerMap.get(q.id) ?? -1;
      const isCorrect = selected === q.correct_index;
      if (isCorrect) correctCount += 1;
      await sql`
        insert into student_answers (user_id, question_id, selected_index, is_correct, attempt)
        values (${context.userId}, ${q.id}, ${selected}, ${isCorrect}, ${attempt})
      `;
      items.push({
        questionId: q.id,
        selectedIndex: selected,
        correctIndex: q.correct_index,
        isCorrect,
        explanation: q.explanation,
        options: parseOptions(q.options),
        prompt: q.prompt,
      });
    }
    const total = questions.length || 1;
    const percent = Math.round((correctCount / total) * 100);
    const passed = percent >= 50;
    const wrong = total - correctCount;
    const showCorrection = !passed || (wrong >= 1 && wrong <= 3) || wrong > 3;

    await upsertProgress(context.userId, data.courseId, {
      viewed_qcm: true,
      viewed_corrections: showCorrection,
      qcm_score: percent,
      qcm_attempts: attempt,
    });

    return {
      score: correctCount,
      total: questions.length,
      percent,
      passed,
      showCorrection,
      items,
      attempt,
    };
  });

export const listMyProgress = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await ensureCatalogSeeded();
    const profile = await getOrCreateProfile(context.userId, { displayName: null, email: null });
    if (!profile.filiereId || !profile.niveau || !profile.semestre) return [];
    const sql = await getSql();
    const courses = await sql<{
      id: number;
      slug: string;
      title: string;
      code: string;
      description: string;
      hours: number;
      sort_order: number;
      filiere_id: number;
      niveau: number;
      semestre: number;
    }>`
      select id, slug, title, code, description, hours, sort_order, filiere_id, niveau, semestre
      from courses
      where filiere_id = ${profile.filiereId} and niveau = ${profile.niveau} and semestre = ${profile.semestre}
      order by sort_order, id
    `;
    const rows = await sql<{
      course_id: number;
      viewed_course: boolean;
      viewed_resume: boolean;
      viewed_exercises: boolean;
      viewed_qcm: boolean;
      viewed_exams: boolean;
      viewed_corrections: boolean;
      qcm_score: number | null;
      qcm_attempts: number;
      completed: boolean;
    }>`select course_id, viewed_course, viewed_resume, viewed_exercises, viewed_qcm, viewed_exams, viewed_corrections, qcm_score, qcm_attempts, completed
       from progress where user_id = ${context.userId}`;
    const byId = Object.fromEntries(rows.map((r) => [r.course_id, r]));
    return courses.map((c) => {
      const p = byId[c.id];
      return {
        course: {
          id: c.id,
          slug: c.slug,
          title: c.title,
          code: c.code,
          description: c.description,
          hours: c.hours,
          sortOrder: c.sort_order,
          filiereId: c.filiere_id,
          niveau: c.niveau,
          semestre: c.semestre,
        } satisfies CourseSummary,
        progress: {
          courseId: c.id,
          viewedCourse: p?.viewed_course ?? false,
          viewedResume: p?.viewed_resume ?? false,
          viewedExercises: p?.viewed_exercises ?? false,
          viewedQcm: p?.viewed_qcm ?? false,
          viewedExams: p?.viewed_exams ?? false,
          viewedCorrections: p?.viewed_corrections ?? false,
          qcmScore: p?.qcm_score ?? null,
          qcmAttempts: p?.qcm_attempts ?? 0,
          completed: p?.completed ?? false,
        } satisfies CourseProgress,
      };
    });
  });

export const startSubscription = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: { plan: "monthly" | "semester"; provider: "orange_money" | "mtn_momo"; phone: string }) =>
      input,
  )
  .handler(async ({ context, data }) => {
    const plan = PLANS.find((p) => p.id === data.plan);
    if (!plan) throw new Error("Formule inconnue");
    const phone = data.phone.replace(/\s+/g, "");
    if (!/^6\d{8}$/.test(phone)) {
      throw new Error("Numéro camerounais invalide (6XX XXX XXX)");
    }
    const profile = await getOrCreateProfile(context.userId, { displayName: null, email: null });
    const sql = await getSql();
    await sql`
      update subscriptions set status = 'expired'
      where user_id = ${context.userId} and status = 'active'
    `;
    const inserted = await sql.query<{ id: number }>(
      `insert into subscriptions (
        user_id, plan, amount_fcfa, provider, status, filiere_id, niveau, semestre, phone, starts_at, expires_at
      ) values (
        $1, $2, $3, $4, 'active', $5, $6, $7, $8, now(), now() + ($9::int * interval '1 day')
      ) returning id`,
      [
        context.userId,
        plan.id,
        plan.price,
        data.provider,
        profile.filiereId,
        profile.niveau,
        profile.semestre,
        phone,
        plan.days,
      ],
    );
    return { ok: true as const, id: inserted[0]?.id ?? 0, expiresInDays: plan.days };
  });

export const askModuleAi = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { courseId: number; question: string }) => input)
  .handler(async ({ context, data }) => {
    const question = data.question.trim().slice(0, 800);
    if (question.length < 8) throw new Error("Formulez une question un peu plus précise.");
    const profile = await getOrCreateProfile(context.userId, { displayName: null, email: null });
    const sub = await getActiveSubscription(context.userId);
    if (profile.role !== "admin" && !sub) throw new Error("Abonnement requis");
    const sql = await getSql();
    const p = await sql<{
      viewed_course: boolean;
      viewed_resume: boolean;
      viewed_corrections: boolean;
    }>`select viewed_course, viewed_resume, viewed_corrections from progress
       where user_id = ${context.userId} and course_id = ${data.courseId}`;
    if (profile.role !== "admin" && !(p[0]?.viewed_course && p[0]?.viewed_resume && p[0]?.viewed_corrections)) {
      throw new Error("Consultez d’abord le cours, le résumé et les corrigés.");
    }
    const course = await sql<{ title: string; code: string; resume: string; content: string }>`
      select title, code, resume, content from courses where id = ${data.courseId}
    `;
    const c = course[0];
    if (!c) throw new Error("Module introuvable");
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return {
        ok: false as const,
        error: "L’assistant n’est pas disponible pour le moment.",
      };
    }
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 700,
        messages: [
          {
            role: "system",
            content:
              "Tu es un tuteur discret de la Faculté des Sciences de l’Université de Douala. Tu aides à approfondir un point déjà étudié. Réponds en français, sobrement, en 8 à 16 phrases. N’invente pas d’évaluation, n’encourage pas à sauter le cours. Si la question sort du module, recentre.",
          },
          {
            role: "user",
            content: `Module ${c.code} — ${c.title}\n\nExtrait du cours :\n${c.content.slice(0, 1800)}\n\nRésumé :\n${c.resume}\n\nQuestion de l’étudiant : ${question}`,
          },
        ],
      }),
    });
    if (!res.ok) {
      return { ok: false as const, error: "L’assistant n’a pas pu répondre." };
    }
    const body = (await res.json()) as { choices: { message: { content: string } }[] };
    return { ok: true as const, text: body.choices[0]?.message.content ?? "" };
  });

export const listAdminStudents = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    await ensureCatalogSeeded();
    const sql = await getSql();
    const rows = await sql<{
      user_id: string;
      display_name: string | null;
      email: string | null;
      role: string;
      niveau: number | null;
      semestre: number | null;
      filiere_name: string | null;
      sub_status: string | null;
      sub_expires: string | null;
      completed: number;
      modules: number;
    }>`
      select p.user_id, p.display_name, p.email, p.role, p.niveau, p.semestre,
             f.name as filiere_name,
             s.status as sub_status, s.expires_at::text as sub_expires,
             coalesce((
               select count(*)::int from progress pr
               where pr.user_id = p.user_id and pr.completed = true
             ), 0) as completed,
             coalesce((
               select count(*)::int from courses c
               where c.filiere_id = p.filiere_id and c.niveau = p.niveau and c.semestre = p.semestre
             ), 0) as modules
      from profiles p
      left join filieres f on f.id = p.filiere_id
      left join lateral (
        select status, expires_at from subscriptions
        where user_id = p.user_id
        order by case when status = 'active' then 0 else 1 end, created_at desc
        limit 1
      ) s on true
      order by p.created_at desc
    `;
    return rows.map((r) => ({
      userId: r.user_id,
      displayName: r.display_name,
      email: r.email,
      role: r.role,
      niveau: r.niveau,
      semestre: r.semestre,
      filiereName: r.filiere_name,
      subStatus: r.sub_status,
      subExpires: r.sub_expires,
      completed: r.completed,
      modules: r.modules,
    }));
  });

export const setSubscriptionStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { userId: string; status: "active" | "expired" }) => input)
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    if (data.status === "expired") {
      await sql`update subscriptions set status = 'expired' where user_id = ${data.userId} and status = 'active'`;
    } else {
      const profile = await sql<{ filiere_id: number | null; niveau: number | null; semestre: number | null }>`
        select filiere_id, niveau, semestre from profiles where user_id = ${data.userId}
      `;
      const p = profile[0];
      await sql`update subscriptions set status = 'expired' where user_id = ${data.userId} and status = 'active'`;
      await sql`
        insert into subscriptions (user_id, plan, amount_fcfa, provider, status, filiere_id, niveau, semestre, starts_at, expires_at)
        values (${data.userId}, 'semester', 10000, 'admin', 'active', ${p?.filiere_id ?? null}, ${p?.niveau ?? null}, ${p?.semestre ?? null}, now(), now() + interval '180 days')
      `;
    }
    return { ok: true as const };
  });

export const setStudentRole = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { userId: string; role: "student" | "admin" }) => input)
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    await sql`update profiles set role = ${data.role}, updated_at = now() where user_id = ${data.userId}`;
    return { ok: true as const };
  });

export const listAdminCourses = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    await ensureCatalogSeeded();
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      title: string;
      code: string;
      niveau: number;
      semestre: number;
      filiere_name: string;
      qcm: number;
      exercices: number;
      exams: number;
    }>`
      select c.id, c.title, c.code, c.niveau, c.semestre, f.short_name as filiere_name,
        (select count(*)::int from questions q where q.course_id = c.id and q.kind = 'qcm') as qcm,
        (select count(*)::int from questions q where q.course_id = c.id and q.kind = 'exercice') as exercices,
        (select count(*)::int from past_exams e where e.course_id = c.id) as exams
      from courses c
      join filieres f on f.id = c.filiere_id
      order by f.sort_order, c.niveau, c.semestre, c.sort_order
    `;
    return rows;
  });

export const saveCourse = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: {
      id?: number;
      filiereId: number;
      niveau: number;
      semestre: number;
      title: string;
      code: string;
      description: string;
      content: string;
      resume: string;
      hours: number;
    }) => input,
  )
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    const slug = data.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 60) || `module-${Date.now()}`;
    if (data.id) {
      await sql`
        update courses set
          filiere_id = ${data.filiereId}, niveau = ${data.niveau}, semestre = ${data.semestre},
          title = ${data.title}, code = ${data.code}, description = ${data.description},
          content = ${data.content}, resume = ${data.resume}, hours = ${data.hours}
        where id = ${data.id}
      `;
      return { id: data.id };
    }
    const inserted = await sql<{ id: number }>`
      insert into courses (filiere_id, niveau, semestre, slug, title, code, description, content, resume, hours, sort_order)
      values (${data.filiereId}, ${data.niveau}, ${data.semestre}, ${slug}, ${data.title}, ${data.code}, ${data.description}, ${data.content}, ${data.resume}, ${data.hours}, 99)
      returning id
    `;
    return { id: inserted[0]?.id ?? 0 };
  });

export const deleteCourse = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { id: number }) => input)
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    await sql`delete from courses where id = ${data.id}`;
    return { ok: true as const };
  });

export const getAdminCourse = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((input: { id: number }) => input)
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    const courses = await sql<{
      id: number;
      filiere_id: number;
      niveau: number;
      semestre: number;
      title: string;
      code: string;
      description: string;
      content: string;
      resume: string;
      hours: number;
    }>`select id, filiere_id, niveau, semestre, title, code, description, content, resume, hours from courses where id = ${data.id}`;
    const course = courses[0];
    if (!course) throw new Error("Module introuvable");
    const questions = await sql<{
      id: number;
      kind: string;
      prompt: string;
      options: unknown;
      correct_index: number | null;
      explanation: string;
      solution: string;
    }>`select id, kind, prompt, options, correct_index, explanation, solution from questions where course_id = ${data.id} order by kind, sort_order, id`;
    const exams = await sql<{
      id: number;
      title: string;
      year: number;
      content: string;
      correction: string;
    }>`select id, title, year, content, correction from past_exams where course_id = ${data.id} order by year desc`;
    return {
      course,
      questions: questions.map((q) => ({
        ...q,
        options: parseOptions(q.options),
      })),
      exams,
    };
  });

export const saveQuestion = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: {
      id?: number;
      courseId: number;
      kind: "qcm" | "exercice";
      prompt: string;
      options?: string[];
      correctIndex?: number;
      explanation?: string;
      solution?: string;
    }) => input,
  )
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    if (data.id) {
      if (data.kind === "qcm") {
        await sql.query(
          `update questions set prompt = $1, options = $2::jsonb, correct_index = $3, explanation = $4 where id = $5`,
          [data.prompt, JSON.stringify(data.options ?? []), data.correctIndex ?? 0, data.explanation ?? "", data.id],
        );
      } else {
        await sql`update questions set prompt = ${data.prompt}, solution = ${data.solution ?? ""} where id = ${data.id}`;
      }
      return { id: data.id };
    }
    if (data.kind === "qcm") {
      await sql.query(
        `insert into questions (course_id, kind, prompt, options, correct_index, explanation, sort_order)
         values ($1, 'qcm', $2, $3::jsonb, $4, $5, 0)`,
        [data.courseId, data.prompt, JSON.stringify(data.options ?? []), data.correctIndex ?? 0, data.explanation ?? ""],
      );
    } else {
      await sql`
        insert into questions (course_id, kind, prompt, solution, sort_order)
        values (${data.courseId}, 'exercice', ${data.prompt}, ${data.solution ?? ""}, 0)
      `;
    }
    return { ok: true as const };
  });

export const deleteQuestion = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { id: number }) => input)
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    await sql`delete from questions where id = ${data.id}`;
    return { ok: true as const };
  });

export const saveExam = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (input: { id?: number; courseId: number; title: string; year: number; content: string; correction: string }) =>
      input,
  )
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    if (data.id) {
      await sql`
        update past_exams set title = ${data.title}, year = ${data.year}, content = ${data.content}, correction = ${data.correction}
        where id = ${data.id}
      `;
      return { id: data.id };
    }
    const inserted = await sql<{ id: number }>`
      insert into past_exams (course_id, title, year, content, correction)
      values (${data.courseId}, ${data.title}, ${data.year}, ${data.content}, ${data.correction})
      returning id
    `;
    return { id: inserted[0]?.id ?? 0 };
  });

export const deleteExam = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { id: number }) => input)
  .handler(async ({ context, data }) => {
    await requireAdmin(context.userId);
    const sql = await getSql();
    await sql`delete from past_exams where id = ${data.id}`;
    return { ok: true as const };
  });
