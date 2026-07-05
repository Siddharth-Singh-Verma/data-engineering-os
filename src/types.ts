// ─── Module Types ───────────────────────────────────────────────

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type Importance = 'must-know' | 'good-to-know' | 'advanced';
export type CareerLevel = 'foundation' | 'junior' | 'mid' | 'senior' | 'architect';
export type QuestionType = 'mcq' | 'multi' | 'flashcard';

export interface ResourceLink {
  title: string;
  url: string;
  duration?: string;
  author?: string;
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface MiniProject {
  title: string;
  description: string;
  skills: string[];
  estimatedHours: number;
}

export interface Module {
  id: string;
  title: string;
  phase: string;
  phaseLabel: string;
  description: string;
  difficulty: Difficulty;
  estimatedHours: number;
  importance: Importance;
  interviewWeight: number; // legacy 1-5 (kept for backwards compat)
  prerequisites: string[];
  learningObjectives: string[];
  whyItExists: string;
  realWorldUsage: string;
  theory: string; // markdown
  resources: {
    docs: ResourceLink[];
    youtube: ResourceLink[];
    udemy: ResourceLink[];
    articles: ResourceLink[];
  };
  miniProject: MiniProject | null;
  exercises: string[];
  nextTopics: string[];
  previousTopics: string[];

  // ─── New fields (all optional for backwards compat) ───
  careerLevel?: CareerLevel;
  interviewImportance?: number;    // 1-5 (★ stars)
  productionImportance?: number;   // 1-5 (★ stars)
  interviewRecommendation?: string; // "Learn Deeply", "Overview Only", etc.
  problemItSolves?: string;
  summary?: string;
  commonMistakes?: string[];
  interviewQuestions?: string[];
  flashcards?: Flashcard[];
}

// ─── Quiz Types ─────────────────────────────────────────────────

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  code?: string; // optional code snippet
  options: string[];
  correct: number | number[]; // index(es) of correct answer(s)
  explanation: string;
}

export interface ModuleQuiz {
  moduleId: string;
  questions: QuizQuestion[];
}

// ─── Roadmap Types ──────────────────────────────────────────────

export interface RoadmapNodeData {
  moduleId: string;
  category: string;
}

export interface RoadmapNodeDef {
  id: string;
  position: { x: number; y: number };
  data: RoadmapNodeData;
  type?: string;
}

export interface RoadmapEdgeDef {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  animated?: boolean;
  type?: string;
}

export interface RoadmapData {
  nodes: RoadmapNodeDef[];
  edges: RoadmapEdgeDef[];
}

// ─── Progress Types ─────────────────────────────────────────────

export interface ModuleProgress {
  started: boolean;
  completedAt?: string;
  exercisesCompleted: string[];
  quizScore?: number;
  quizAttempts: number;
  hoursLogged: number;
  notes: string;
  lastVisited?: string;
}

export interface UserProgress {
  completedModules: string[];
  moduleProgress: Record<string, ModuleProgress>;
  studyDays: string[]; // ISO date strings
  settings: {
    theme: 'dark' | 'light';
  };
}

// ─── Career Level Labels ────────────────────────────────────────

export const CAREER_LEVEL_LABELS: Record<CareerLevel, string> = {
  foundation: 'Foundation',
  junior: 'Junior DE',
  mid: 'Mid-Level',
  senior: 'Senior DE',
  architect: 'Architect',
};

export const CAREER_LEVEL_COLORS: Record<CareerLevel, string> = {
  foundation: 'hsl(155, 60%, 50%)',
  junior: 'hsl(217, 80%, 60%)',
  mid: 'hsl(270, 60%, 60%)',
  senior: 'hsl(25, 90%, 55%)',
  architect: 'hsl(350, 70%, 55%)',
};

// ─── Interview Importance Labels ────────────────────────────────

export const INTERVIEW_IMPORTANCE_LABELS: Record<number, string> = {
  1: 'Overview Only',
  2: 'Know Concept',
  3: 'Learn Enough',
  4: 'Learn Well',
  5: 'Learn Deeply',
};

// ─── Category Colors ────────────────────────────────────────────

export const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  foundation:     { bg: 'bg-emerald-500/10',  border: 'border-emerald-500/40',  text: 'text-emerald-400',  glow: 'shadow-emerald-500/20' },
  concepts:       { bg: 'bg-teal-500/10',     border: 'border-teal-500/40',     text: 'text-teal-400',     glow: 'shadow-teal-500/20' },
  architecture:   { bg: 'bg-indigo-500/10',   border: 'border-indigo-500/40',   text: 'text-indigo-400',   glow: 'shadow-indigo-500/20' },
  storage:        { bg: 'bg-amber-500/10',    border: 'border-amber-500/40',    text: 'text-amber-400',    glow: 'shadow-amber-500/20' },
  distributed:    { bg: 'bg-orange-500/10',   border: 'border-orange-500/40',   text: 'text-orange-400',   glow: 'shadow-orange-500/20' },
  spark:          { bg: 'bg-red-500/10',      border: 'border-red-500/40',      text: 'text-red-400',      glow: 'shadow-red-500/20' },
  databricks:     { bg: 'bg-rose-500/10',     border: 'border-rose-500/40',     text: 'text-rose-400',     glow: 'shadow-rose-500/20' },
  modeling:       { bg: 'bg-pink-500/10',     border: 'border-pink-500/40',     text: 'text-pink-400',     glow: 'shadow-pink-500/20' },
  transformation: { bg: 'bg-violet-500/10',   border: 'border-violet-500/40',   text: 'text-violet-400',   glow: 'shadow-violet-500/20' },
  orchestration:  { bg: 'bg-blue-500/10',     border: 'border-blue-500/40',     text: 'text-blue-400',     glow: 'shadow-blue-500/20' },
  streaming:      { bg: 'bg-cyan-500/10',     border: 'border-cyan-500/40',     text: 'text-cyan-400',     glow: 'shadow-cyan-500/20' },
  cloud:          { bg: 'bg-sky-500/10',      border: 'border-sky-500/40',      text: 'text-sky-400',      glow: 'shadow-sky-500/20' },
  devops:         { bg: 'bg-slate-500/10',    border: 'border-slate-500/40',    text: 'text-slate-400',    glow: 'shadow-slate-500/20' },
  projects:       { bg: 'bg-lime-500/10',     border: 'border-lime-500/40',     text: 'text-lime-400',     glow: 'shadow-lime-500/20' },
  'system-design':{ bg: 'bg-fuchsia-500/10',  border: 'border-fuchsia-500/40',  text: 'text-fuchsia-400',  glow: 'shadow-fuchsia-500/20' },
  interview:      { bg: 'bg-yellow-500/10',   border: 'border-yellow-500/40',   text: 'text-yellow-400',   glow: 'shadow-yellow-500/20' },
};

export const CATEGORY_LABELS: Record<string, string> = {
  foundation:     'Foundations',
  concepts:       'Modern DE Concepts',
  architecture:   'Modern Data Architecture',
  storage:        'Storage & Formats',
  distributed:    'Distributed Computing',
  spark:          'Apache Spark',
  databricks:     'Databricks',
  modeling:       'Data Modeling',
  transformation: 'Data Transformation',
  orchestration:  'Orchestration',
  streaming:      'Streaming',
  cloud:          'AWS Cloud',
  devops:         'DevOps & CI/CD',
  projects:       'Projects',
  'system-design':'System Design',
  interview:      'Interview Preparation',
};
