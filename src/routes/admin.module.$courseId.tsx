import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  deleteCourse,
  deleteExam,
  deleteQuestion,
  getAdminCourse,
  getMe,
  listFilieres,
  saveCourse,
  saveExam,
  saveQuestion,
} from "@/lib/server/fns";

export const Route = createFileRoute("/admin/module/$courseId")({ component: AdminCoursePage });

function AdminCoursePage() {
  return <Editor />;
}

function Editor() {
  const { courseId } = Route.useParams();
  const isNew = courseId === "new";
  const id = Number(courseId);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const me = useQuery({ queryKey: ["me"], queryFn: () => getMe() });
  const filieres = useQuery({ queryKey: ["filieres"], queryFn: () => listFilieres() });
  const bundle = useQuery({
    queryKey: ["admin-course", id],
    queryFn: () => getAdminCourse({ data: { id } }),
    enabled: !isNew && Number.isFinite(id),
  });

  const [filiereId, setFiliereId] = useState(1);
  const [niveau, setNiveau] = useState(1);
  const [semestre, setSemestre] = useState(1);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [resume, setResume] = useState("");
  const [hours, setHours] = useState(40);

  useEffect(() => {
    const c = bundle.data?.course;
    if (!c) return;
    setFiliereId(c.filiere_id);
    setNiveau(c.niveau);
    setSemestre(c.semestre);
    setTitle(c.title);
    setCode(c.code);
    setDescription(c.description);
    setContent(c.content);
    setResume(c.resume);
    setHours(c.hours);
  }, [bundle.data]);

  const save = useMutation({
    mutationFn: () =>
      saveCourse({
        data: {
          id: isNew ? undefined : id,
          filiereId,
          niveau,
          semestre,
          title,
          code,
          description,
          content,
          resume,
          hours,
        },
      }),
    onSuccess: async (res) => {
      await qc.invalidateQueries({ queryKey: ["admin-courses"] });
      if (isNew && res.id) {
        await navigate({ to: "/admin/module/$courseId", params: { courseId: String(res.id) } });
      } else {
        await qc.invalidateQueries({ queryKey: ["admin-course", id] });
      }
    },
  });
  const remove = useMutation({
    mutationFn: () => deleteCourse({ data: { id } }),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["admin-courses"] });
      await navigate({ to: "/admin" });
    },
  });

  if (me.isSuccess && me.data.profile.role !== "admin") return <Navigate to="/profil" />;

  return (
    <div>
      <Link to="/admin" className="text-sm text-muted">
        ← Administration
      </Link>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink">
        {isNew ? "Nouveau module" : "Éditer le module"}
      </h1>

      <div className="mt-6 space-y-3">
        <Label>Filière</Label>
        <select
          className="h-11 w-full rounded-xl bg-cream px-3 shadow-[inset_0_0_0_1px_var(--color-line)]"
          value={filiereId}
          onChange={(e) => setFiliereId(Number(e.target.value))}
        >
          {(filieres.data ?? []).map((f) => (
            <option key={f.id} value={f.id}>
              {f.shortName} — {f.name}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <Label>Niveau</Label>
            <Input type="number" min={1} max={2} value={niveau} onChange={(e) => setNiveau(Number(e.target.value))} />
          </div>
          <div>
            <Label>Semestre</Label>
            <Input type="number" min={1} max={2} value={semestre} onChange={(e) => setSemestre(Number(e.target.value))} />
          </div>
          <div>
            <Label>Heures</Label>
            <Input type="number" value={hours} onChange={(e) => setHours(Number(e.target.value))} />
          </div>
        </div>
        <div>
          <Label>Code</Label>
          <Input value={code} onChange={(e) => setCode(e.target.value)} />
        </div>
        <div>
          <Label>Titre</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <Label>Chapeau</Label>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <Label>Cours</Label>
          <Textarea rows={10} value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          <Label>Résumé</Label>
          <Textarea rows={5} value={resume} onChange={(e) => setResume(e.target.value)} />
        </div>
        <Button className="w-full" disabled={save.isPending || !title || !code} onClick={() => save.mutate()}>
          Enregistrer
        </Button>
        {!isNew ? (
          <Button variant="danger" className="w-full" onClick={() => remove.mutate()}>
            Supprimer le module
          </Button>
        ) : null}
      </div>

      {!isNew && bundle.data ? (
        <>
          <QuestionsBlock
            courseId={id}
            questions={bundle.data.questions}
            onChanged={() => qc.invalidateQueries({ queryKey: ["admin-course", id] })}
          />
          <ExamsBlock
            courseId={id}
            exams={bundle.data.exams}
            onChanged={() => qc.invalidateQueries({ queryKey: ["admin-course", id] })}
          />
        </>
      ) : null}
    </div>
  );
}

function QuestionsBlock({
  courseId,
  questions,
  onChanged,
}: {
  courseId: number;
  questions: {
    id: number;
    kind: string;
    prompt: string;
    options: string[];
    correct_index: number | null;
    explanation: string;
    solution: string;
  }[];
  onChanged: () => void;
}) {
  const [kind, setKind] = useState<"qcm" | "exercice">("qcm");
  const [prompt, setPrompt] = useState("");
  const [o1, setO1] = useState("");
  const [o2, setO2] = useState("");
  const [o3, setO3] = useState("");
  const [o4, setO4] = useState("");
  const [correct, setCorrect] = useState(0);
  const [extra, setExtra] = useState("");
  const add = useMutation({
    mutationFn: () =>
      saveQuestion({
        data: {
          courseId,
          kind,
          prompt,
          options: kind === "qcm" ? [o1, o2, o3, o4] : undefined,
          correctIndex: kind === "qcm" ? correct : undefined,
          explanation: kind === "qcm" ? extra : undefined,
          solution: kind === "exercice" ? extra : undefined,
        },
      }),
    onSuccess: () => {
      setPrompt("");
      setO1("");
      setO2("");
      setO3("");
      setO4("");
      setExtra("");
      onChanged();
    },
  });
  const del = useMutation({
    mutationFn: (qid: number) => deleteQuestion({ data: { id: qid } }),
    onSuccess: onChanged,
  });

  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-semibold text-ink">QCM et exercices</h2>
      <ul className="mt-3 space-y-2">
        {questions.map((q) => (
          <li key={q.id} className="rounded-2xl bg-cream p-3 text-sm shadow-paper">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">{q.kind}</span>
            <p className="mt-1 text-ink">{q.prompt}</p>
            <button type="button" className="mt-2 text-danger" onClick={() => del.mutate(q.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 space-y-2">
        <div className="flex gap-2">
          <Button size="sm" variant={kind === "qcm" ? "primary" : "ghost"} onClick={() => setKind("qcm")}>
            QCM
          </Button>
          <Button size="sm" variant={kind === "exercice" ? "primary" : "ghost"} onClick={() => setKind("exercice")}>
            Exercice
          </Button>
        </div>
        <Textarea placeholder="Énoncé" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        {kind === "qcm" ? (
          <>
            <Input placeholder="Option A" value={o1} onChange={(e) => setO1(e.target.value)} />
            <Input placeholder="Option B" value={o2} onChange={(e) => setO2(e.target.value)} />
            <Input placeholder="Option C" value={o3} onChange={(e) => setO3(e.target.value)} />
            <Input placeholder="Option D" value={o4} onChange={(e) => setO4(e.target.value)} />
            <Label>Bonne réponse (0–3)</Label>
            <Input type="number" min={0} max={3} value={correct} onChange={(e) => setCorrect(Number(e.target.value))} />
            <Textarea placeholder="Explication" value={extra} onChange={(e) => setExtra(e.target.value)} />
          </>
        ) : (
          <Textarea placeholder="Corrigé" value={extra} onChange={(e) => setExtra(e.target.value)} />
        )}
        <Button disabled={!prompt || add.isPending} onClick={() => add.mutate()}>
          Ajouter
        </Button>
      </div>
    </section>
  );
}

function ExamsBlock({
  courseId,
  exams,
  onChanged,
}: {
  courseId: number;
  exams: { id: number; title: string; year: number; content: string; correction: string }[];
  onChanged: () => void;
}) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(2025);
  const [content, setContent] = useState("");
  const [correction, setCorrection] = useState("");
  const add = useMutation({
    mutationFn: () => saveExam({ data: { courseId, title, year, content, correction } }),
    onSuccess: () => {
      setTitle("");
      setContent("");
      setCorrection("");
      onChanged();
    },
  });
  const del = useMutation({
    mutationFn: (id: number) => deleteExam({ data: { id } }),
    onSuccess: onChanged,
  });
  return (
    <section className="mt-10 mb-8">
      <h2 className="font-display text-xl font-semibold text-ink">Anciennes épreuves</h2>
      <ul className="mt-3 space-y-2">
        {exams.map((e) => (
          <li key={e.id} className="rounded-2xl bg-cream p-3 text-sm shadow-paper">
            <p className="font-medium text-ink">
              {e.year} — {e.title}
            </p>
            <button type="button" className="mt-2 text-danger" onClick={() => del.mutate(e.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 space-y-2">
        <Input placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} />
        <Textarea placeholder="Sujet" value={content} onChange={(e) => setContent(e.target.value)} />
        <Textarea placeholder="Corrigé" value={correction} onChange={(e) => setCorrection(e.target.value)} />
        <Button disabled={!title || add.isPending} onClick={() => add.mutate()}>
          Ajouter l’épreuve
        </Button>
      </div>
    </section>
  );
}
