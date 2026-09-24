import { getSql } from "@/lib/db";
import { SEED_COURSES, SEED_FILIERES } from "@/lib/catalog-seed";

export async function ensureCatalogSeeded() {
  const sql = await getSql();
  const existing = await sql<{ c: number }>`select count(*)::int as c from filieres`;
  if ((existing[0]?.c ?? 0) > 0) return;

  for (const f of SEED_FILIERES) {
    await sql`
      insert into filieres (slug, name, short_name, description, sort_order)
      values (${f.slug}, ${f.name}, ${f.shortName}, ${f.description}, ${f.sortOrder})
    `;
  }

  const filiereRows = await sql<{ id: number; slug: string }>`select id, slug from filieres`;
  const filiereId = Object.fromEntries(filiereRows.map((r) => [r.slug, r.id]));

  for (const [index, course] of SEED_COURSES.entries()) {
    const fid = filiereId[course.filiereSlug];
    if (!fid) continue;
    const inserted = await sql<{ id: number }>`
      insert into courses (
        filiere_id, niveau, semestre, slug, title, code, description, content, resume, hours, sort_order
      ) values (
        ${fid}, ${course.niveau}, ${course.semestre}, ${course.slug}, ${course.title},
        ${course.code}, ${course.description}, ${course.content}, ${course.resume},
        ${course.hours}, ${index}
      ) returning id
    `;
    const courseId = inserted[0]?.id;
    if (!courseId) continue;

    for (const [i, item] of course.qcm.entries()) {
      await sql.query(
        `insert into questions (course_id, kind, prompt, options, correct_index, explanation, sort_order)
         values ($1, 'qcm', $2, $3::jsonb, $4, $5, $6)`,
        [courseId, item.prompt, JSON.stringify(item.options), item.correct, item.explanation, i],
      );
    }
    for (const [i, item] of course.exercices.entries()) {
      await sql`
        insert into questions (course_id, kind, prompt, solution, sort_order)
        values (${courseId}, 'exercice', ${item.prompt}, ${item.solution}, ${i})
      `;
    }
    for (const exam of course.exams ?? []) {
      await sql`
        insert into past_exams (course_id, title, year, content, correction)
        values (${courseId}, ${exam.title}, ${exam.year}, ${exam.content}, ${exam.correction})
      `;
    }
  }
}
