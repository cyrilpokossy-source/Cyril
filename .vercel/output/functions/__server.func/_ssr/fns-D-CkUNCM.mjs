import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-4owC__Jv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fns-D-CkUNCM.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getMe = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("7749e2977d8573d9fb42eb288dd2cd725048dc1c975e1ed42bb8cb5b26f12aa1"));
var listFilieres = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("592c515205c245ae0c5a1790b7cbe3b0cbc951b68b665fc01366593193a6043c"));
var updateProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("38e68c48ef99b6ad0a14a6c65a0a1ea47f82bb6fb97159820968a9f342bbbf78"));
var claimAdmin = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("acf1c556ad5d0e513dea7ee302c674744f5cc612ba8f7ef94fc556320db9af7d"));
var saveParcours = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("34824b2cf7c7396792110579073c5d891f8e80b5f9487411451de8d27c3e16db"));
createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("837a9dad03b899aa95458456d99202e38f7f73e9b84ff3a9042d72fcb3bf9c7c"));
var getCourseBundle = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("627c6b061594d3724986714c2da6fc234f1c9ccc3accf8a1a9a2ff70c4e72ac5"));
var markProgress = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("1096f2cc0d8d96f80d9e77c6a189fd02bb781078dca1dbb662e076bca6c6f8e0"));
var submitQcm = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("b7b882dec23cc8c2e1af1888ceb9f815424a6be0648f41ebf5f68bbc11dfa23a"));
var listMyProgress = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("28c1b8414fb13cc0951d0ec090c0502b2211ff0e4876989f4ce7bdabc50bb697"));
var startSubscription = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("b986631e767d9f48bc13821d8ee0076893579ae0290d43a17d541c87b8e7c6e8"));
var askModuleAi = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("7d507c92b991715167edf1fcdbe3a1af81cadc2305590e5f0ee59b11650a94b1"));
var listAdminStudents = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("bf938455bbfd1f03f8bcc60b374ab028d43efdadb4f5b34afc5d58d6d508fe13"));
var setSubscriptionStatus = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("215792bc0b972077070cd23fc063bec2369872be03546c9649fa7381d2d9cc31"));
var setStudentRole = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("dbc47e37af697a94a669af1ce959df4602d9d74787cd7960cd7c44a1314d79f7"));
var listAdminCourses = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("f38d41702e1adcd2359faeb6dd7c7565bc5d1a4d6d51be5fc5e7e228e0fca370"));
var saveCourse = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("60aae911292ad73bbb4d694f85301ef435dc0140233a6d4643c4e1a3f9492ee3"));
var deleteCourse = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("57656bb58956ede032de91018eb86cc8f2416928f3821937fc223d408fdab08e"));
var getAdminCourse = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("3a510ec5d4e4c9e4ce7bc3802c2d671e630e4a9bb4b32cb3e8738918da453ebf"));
var saveQuestion = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("03d03338adcce9e5ea6a8e9d6acdfa5087693c1bea51953fc161580d50c16dd6"));
var deleteQuestion = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("6405d648028af872f4f01eafc5e8eaf5a52aee686e2960fcb03220cf8c96364e"));
var saveExam = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("a25f44cfe0e6877dcbd39c5ead23ef4d9ea8e66564e5e6c8fb07e0f676588a46"));
var deleteExam = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("0f9befe6abf79febb9f4fd7867096d448798f958fa86c7da9abaab35e752179c"));
//#endregion
export { updateProfile as S, saveQuestion as _, deleteQuestion as a, startSubscription as b, getMe as c, listFilieres as d, listMyProgress as f, saveParcours as g, saveExam as h, deleteExam as i, listAdminCourses as l, saveCourse as m, claimAdmin as n, getAdminCourse as o, markProgress as p, deleteCourse as r, getCourseBundle as s, askModuleAi as t, listAdminStudents as u, setStudentRole as v, submitQcm as x, setSubscriptionStatus as y };
