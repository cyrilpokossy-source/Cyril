export type Role = "student" | "admin";
export type Plan = "monthly" | "semester";
export type PayProvider = "orange_money" | "mtn_momo";
export type SubStatus = "pending" | "active" | "expired" | "failed";
export type QuestionKind = "qcm" | "exercice";

export type Filiere = {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  description: string;
};

export type Profile = {
  userId: string;
  role: Role;
  displayName: string | null;
  email: string | null;
  filiereId: number | null;
  niveau: number | null;
  semestre: number | null;
  filiere: Filiere | null;
};

export type CourseSummary = {
  id: number;
  slug: string;
  title: string;
  code: string;
  description: string;
  hours: number;
  sortOrder: number;
  filiereId: number;
  niveau: number;
  semestre: number;
};

export type Course = CourseSummary & {
  content: string;
  resume: string;
};

export type QcmQuestion = {
  id: number;
  prompt: string;
  options: string[];
  sortOrder: number;
};

export type QcmQuestionAdmin = QcmQuestion & {
  correctIndex: number;
  explanation: string;
};

export type Exercise = {
  id: number;
  prompt: string;
  solution: string;
  sortOrder: number;
};

export type PastExam = {
  id: number;
  title: string;
  year: number;
  content: string;
  correction: string;
};

export type CourseProgress = {
  courseId: number;
  viewedCourse: boolean;
  viewedResume: boolean;
  viewedExercises: boolean;
  viewedQcm: boolean;
  viewedExams: boolean;
  viewedCorrections: boolean;
  qcmScore: number | null;
  qcmAttempts: number;
  completed: boolean;
};

export type Subscription = {
  id: number;
  plan: Plan;
  amountFcfa: number;
  provider: string;
  status: SubStatus;
  filiereId: number | null;
  niveau: number | null;
  semestre: number | null;
  phone: string | null;
  startsAt: string | null;
  expiresAt: string | null;
};

export type QcmResultItem = {
  questionId: number;
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
  explanation: string;
  options: string[];
  prompt: string;
};

export type QcmSubmitResult = {
  score: number;
  total: number;
  percent: number;
  passed: boolean;
  showCorrection: boolean;
  items: QcmResultItem[];
  attempt: number;
};

export type AdminPayment = {
  id: number;
  displayName: string | null;
  email: string | null;
  plan: string;
  amountFcfa: number;
  provider: string;
  status: string;
  createdAt: string;
  expiresAt: string | null;
};

export type AdminFinance = {
  students: number;
  admins: number;
  active: number;
  expired: number;
  none: number;
  collected: number;
  monthlyCount: number;
  monthlySum: number;
  semesterCount: number;
  semesterSum: number;
  orange: number;
  mtn: number;
  adminGift: number;
  payments: AdminPayment[];
};

export const PLANS: { id: Plan; label: string; price: number; days: number; hint: string }[] = [
  { id: "monthly", label: "Mensuel", price: 2000, days: 30, hint: "Accès 30 jours au semestre choisi" },
  { id: "semester", label: "Semestriel", price: 10000, days: 180, hint: "Accès 6 mois — le plus choisi" },
];
