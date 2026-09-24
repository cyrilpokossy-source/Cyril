import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Navigate, x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { _ as saveQuestion, a as deleteQuestion, c as getMe, d as listFilieres, h as saveExam, i as deleteExam, m as saveCourse, o as getAdminCourse, r as deleteCourse } from "./fns-D-CkUNCM.mjs";
import { t as Button } from "./button-DduQMDuC.mjs";
import { n as Label, t as Input } from "./label-Dlz-_maa.mjs";
import { n as Route$6 } from "./router-Cn1Zpie7.mjs";
import { t as Textarea } from "./textarea-BCe6Af0V.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.module._courseId-DmkgAWA6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminCoursePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Editor, {});
}
function Editor() {
	const { courseId } = Route$6.useParams();
	const isNew = courseId === "new";
	const id = Number(courseId);
	const navigate = useNavigate();
	const qc = useQueryClient();
	const me = useQuery({
		queryKey: ["me"],
		queryFn: () => getMe()
	});
	const filieres = useQuery({
		queryKey: ["filieres"],
		queryFn: () => listFilieres()
	});
	const bundle = useQuery({
		queryKey: ["admin-course", id],
		queryFn: () => getAdminCourse({ data: { id } }),
		enabled: !isNew && Number.isFinite(id)
	});
	const [filiereId, setFiliereId] = (0, import_react.useState)(1);
	const [niveau, setNiveau] = (0, import_react.useState)(1);
	const [semestre, setSemestre] = (0, import_react.useState)(1);
	const [title, setTitle] = (0, import_react.useState)("");
	const [code, setCode] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [content, setContent] = (0, import_react.useState)("");
	const [resume, setResume] = (0, import_react.useState)("");
	const [hours, setHours] = (0, import_react.useState)(40);
	(0, import_react.useEffect)(() => {
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
		mutationFn: () => saveCourse({ data: {
			id: isNew ? void 0 : id,
			filiereId,
			niveau,
			semestre,
			title,
			code,
			description,
			content,
			resume,
			hours
		} }),
		onSuccess: async (res) => {
			await qc.invalidateQueries({ queryKey: ["admin-courses"] });
			if (isNew && res.id) await navigate({
				to: "/admin/module/$courseId",
				params: { courseId: String(res.id) }
			});
			else await qc.invalidateQueries({ queryKey: ["admin-course", id] });
		}
	});
	const remove = useMutation({
		mutationFn: () => deleteCourse({ data: { id } }),
		onSuccess: async () => {
			await qc.invalidateQueries({ queryKey: ["admin-courses"] });
			await navigate({ to: "/admin" });
		}
	});
	if (me.isSuccess && me.data.profile.role !== "admin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/profil" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/admin",
			className: "text-sm text-muted",
			children: "← Administration"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-3 font-display text-3xl font-semibold text-ink",
			children: isNew ? "Nouveau module" : "Éditer le module"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Filière" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "h-11 w-full rounded-xl bg-cream px-3 shadow-[inset_0_0_0_1px_var(--color-line)]",
					value: filiereId,
					onChange: (e) => setFiliereId(Number(e.target.value)),
					children: (filieres.data ?? []).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: f.id,
						children: [
							f.shortName,
							" — ",
							f.name
						]
					}, f.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Niveau" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 1,
							max: 2,
							value: niveau,
							onChange: (e) => setNiveau(Number(e.target.value))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Semestre" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 1,
							max: 2,
							value: semestre,
							onChange: (e) => setSemestre(Number(e.target.value))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Heures" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: hours,
							onChange: (e) => setHours(Number(e.target.value))
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Code" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: code,
					onChange: (e) => setCode(e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Titre" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: title,
					onChange: (e) => setTitle(e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Chapeau" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: description,
					onChange: (e) => setDescription(e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Cours" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 10,
					value: content,
					onChange: (e) => setContent(e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Résumé" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 5,
					value: resume,
					onChange: (e) => setResume(e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full",
					disabled: save.isPending || !title || !code,
					onClick: () => save.mutate(),
					children: "Enregistrer"
				}),
				!isNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "danger",
					className: "w-full",
					onClick: () => remove.mutate(),
					children: "Supprimer le module"
				}) : null
			]
		}),
		!isNew && bundle.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionsBlock, {
			courseId: id,
			questions: bundle.data.questions,
			onChanged: () => qc.invalidateQueries({ queryKey: ["admin-course", id] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExamsBlock, {
			courseId: id,
			exams: bundle.data.exams,
			onChanged: () => qc.invalidateQueries({ queryKey: ["admin-course", id] })
		})] }) : null
	] });
}
function QuestionsBlock({ courseId, questions, onChanged }) {
	const [kind, setKind] = (0, import_react.useState)("qcm");
	const [prompt, setPrompt] = (0, import_react.useState)("");
	const [o1, setO1] = (0, import_react.useState)("");
	const [o2, setO2] = (0, import_react.useState)("");
	const [o3, setO3] = (0, import_react.useState)("");
	const [o4, setO4] = (0, import_react.useState)("");
	const [correct, setCorrect] = (0, import_react.useState)(0);
	const [extra, setExtra] = (0, import_react.useState)("");
	const add = useMutation({
		mutationFn: () => saveQuestion({ data: {
			courseId,
			kind,
			prompt,
			options: kind === "qcm" ? [
				o1,
				o2,
				o3,
				o4
			] : void 0,
			correctIndex: kind === "qcm" ? correct : void 0,
			explanation: kind === "qcm" ? extra : void 0,
			solution: kind === "exercice" ? extra : void 0
		} }),
		onSuccess: () => {
			setPrompt("");
			setO1("");
			setO2("");
			setO3("");
			setO4("");
			setExtra("");
			onChanged();
		}
	});
	const del = useMutation({
		mutationFn: (qid) => deleteQuestion({ data: { id: qid } }),
		onSuccess: onChanged
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold text-ink",
				children: "QCM et exercices"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: questions.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-2xl bg-cream p-3 text-sm shadow-paper",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted",
							children: q.kind
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-ink",
							children: q.prompt
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-2 text-danger",
							onClick: () => del.mutate(q.id),
							children: "Supprimer"
						})
					]
				}, q.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: kind === "qcm" ? "primary" : "ghost",
							onClick: () => setKind("qcm"),
							children: "QCM"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: kind === "exercice" ? "primary" : "ghost",
							onClick: () => setKind("exercice"),
							children: "Exercice"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						placeholder: "Énoncé",
						value: prompt,
						onChange: (e) => setPrompt(e.target.value)
					}),
					kind === "qcm" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Option A",
							value: o1,
							onChange: (e) => setO1(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Option B",
							value: o2,
							onChange: (e) => setO2(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Option C",
							value: o3,
							onChange: (e) => setO3(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Option D",
							value: o4,
							onChange: (e) => setO4(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Bonne réponse (0–3)" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 0,
							max: 3,
							value: correct,
							onChange: (e) => setCorrect(Number(e.target.value))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							placeholder: "Explication",
							value: extra,
							onChange: (e) => setExtra(e.target.value)
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						placeholder: "Corrigé",
						value: extra,
						onChange: (e) => setExtra(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: !prompt || add.isPending,
						onClick: () => add.mutate(),
						children: "Ajouter"
					})
				]
			})
		]
	});
}
function ExamsBlock({ courseId, exams, onChanged }) {
	const [title, setTitle] = (0, import_react.useState)("");
	const [year, setYear] = (0, import_react.useState)(2025);
	const [content, setContent] = (0, import_react.useState)("");
	const [correction, setCorrection] = (0, import_react.useState)("");
	const add = useMutation({
		mutationFn: () => saveExam({ data: {
			courseId,
			title,
			year,
			content,
			correction
		} }),
		onSuccess: () => {
			setTitle("");
			setContent("");
			setCorrection("");
			onChanged();
		}
	});
	const del = useMutation({
		mutationFn: (id) => deleteExam({ data: { id } }),
		onSuccess: onChanged
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-10 mb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold text-ink",
				children: "Anciennes épreuves"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: exams.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-2xl bg-cream p-3 text-sm shadow-paper",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-medium text-ink",
						children: [
							e.year,
							" — ",
							e.title
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-2 text-danger",
						onClick: () => del.mutate(e.id),
						children: "Supprimer"
					})]
				}, e.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Titre",
						value: title,
						onChange: (e) => setTitle(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						value: year,
						onChange: (e) => setYear(Number(e.target.value))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						placeholder: "Sujet",
						value: content,
						onChange: (e) => setContent(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						placeholder: "Corrigé",
						value: correction,
						onChange: (e) => setCorrection(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: !title || add.isPending,
						onClick: () => add.mutate(),
						children: "Ajouter l’épreuve"
					})
				]
			})
		]
	});
}
//#endregion
export { AdminCoursePage as component };
