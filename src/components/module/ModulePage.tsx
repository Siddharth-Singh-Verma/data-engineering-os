import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { motion } from 'motion/react';
import {
  BookOpen, ExternalLink, Video, GraduationCap, FileText, Lightbulb,
  Clock, Star, Flame, ChevronLeft, ChevronRight, Check, Square,
  CheckSquare, Download, ArrowLeft, Rocket, HelpCircle, StickyNote,
  AlertTriangle, MessageSquare, Layers, RotateCcw
} from 'lucide-react';
import type { Module, ModuleQuiz as ModuleQuizType } from '@/types';
import { CATEGORY_LABELS, CAREER_LEVEL_LABELS, CAREER_LEVEL_COLORS, INTERVIEW_IMPORTANCE_LABELS } from '@/types';
import { ModuleQuiz } from '@/components/quiz/ModuleQuiz';

interface ModulePageProps {
  modules: Module[];
  quizzes: ModuleQuizType[];
  getModuleProgress: (id: string) => { started: boolean; exercisesCompleted: string[]; quizScore?: number; quizAttempts: number; hoursLogged: number; notes: string };
  startModule: (id: string) => void;
  toggleModuleComplete: (id: string) => void;
  toggleExercise: (moduleId: string, exercise: string) => void;
  saveQuizScore: (moduleId: string, score: number) => void;
  saveNotes: (moduleId: string, notes: string) => void;
  isCompleted: (id: string) => boolean;
  isUnlocked: (prerequisites: string[]) => boolean;
}

type TabId = 'overview' | 'theory' | 'resources' | 'project' | 'exercises' | 'quiz' | 'flashcards' | 'interview-q' | 'notes';

export function ModulePage({
  modules, quizzes, getModuleProgress, startModule,
  toggleModuleComplete, toggleExercise, saveQuizScore, saveNotes, isCompleted, isUnlocked
}: ModulePageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [notesDraft, setNotesDraft] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const mod = useMemo(() => modules.find(m => m.id === id), [modules, id]);
  const quiz = useMemo(() => quizzes.find(q => q.moduleId === id), [quizzes, id]);
  const mp = mod ? getModuleProgress(mod.id) : null;

  // Auto-start module on visit
  useEffect(() => {
    if (mod && !mp?.started) startModule(mod.id);
  }, [mod, mp?.started, startModule]);

  // Sync notes
  useEffect(() => {
    if (mp) setNotesDraft(mp.notes || '');
  }, [id, mp]);

  // Debounced notes save
  useEffect(() => {
    if (!mod) return;
    const timer = setTimeout(() => saveNotes(mod.id, notesDraft), 1500);
    return () => clearTimeout(timer);
  }, [notesDraft, mod, saveNotes]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowLeft' && prevMod) navigate(`/module/${prevMod.id}`);
      if (e.key === 'ArrowRight' && nextMod) navigate(`/module/${nextMod.id}`);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const currentIndex = modules.findIndex(m => m.id === id);
  const prevMod = currentIndex > 0 ? modules[currentIndex - 1] : null;
  const nextMod = currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;

  const exportNotes = useCallback(() => {
    if (!mod) return;
    const blob = new Blob([notesDraft], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${mod.id}-notes.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [notesDraft, mod]);

  if (!mod) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>Module not found</h2>
        <Link to="/" className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>← Back to Roadmap</Link>
      </div>
    );
  }

  if (!isUnlocked(mod.prerequisites)) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="w-16 h-16 rounded-full bg-[var(--color-bg-card)] flex items-center justify-center mb-2 shadow-lg border border-[var(--color-border-default)]">
          <span className="text-3xl">🔒</span>
        </div>
        <h2 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>Module Locked</h2>
        <p className="text-sm text-center max-w-md" style={{ color: 'var(--color-text-secondary)' }}>
          You must complete the prerequisite modules before accessing <strong>{mod.title}</strong>.
        </p>
        <Link to="/" className="mt-4 text-sm font-medium px-4 py-2 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border-default)] hover:border-[var(--color-accent)] transition-all" style={{ color: 'var(--color-text-primary)' }}>← Back to Roadmap</Link>
      </div>
    );
  }

  const completed = isCompleted(mod.id);

  const tabs: { id: TabId; label: string; icon: React.ElementType; count?: number }[] = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'theory', label: 'Theory', icon: Lightbulb },
    { id: 'resources', label: 'Resources', icon: ExternalLink },
    ...(mod.miniProject ? [{ id: 'project' as TabId, label: 'Project', icon: Rocket }] : []),
    ...(mod.exercises.length > 0 ? [{ id: 'exercises' as TabId, label: 'Exercises', icon: CheckSquare, count: mod.exercises.length }] : []),
    ...(quiz ? [{ id: 'quiz' as TabId, label: 'Quiz', icon: HelpCircle, count: quiz.questions.length }] : []),
    ...(mod.flashcards && mod.flashcards.length > 0 ? [{ id: 'flashcards' as TabId, label: 'Flashcards', icon: Layers, count: mod.flashcards.length }] : []),
    ...(mod.interviewQuestions && mod.interviewQuestions.length > 0 ? [{ id: 'interview-q' as TabId, label: 'Interview', icon: MessageSquare, count: mod.interviewQuestions.length }] : []),
    { id: 'notes', label: 'Notes', icon: StickyNote },
  ];

  const importanceColors: Record<string, string> = {
    'must-know': 'text-amber-400',
    'good-to-know': 'text-blue-400',
    'advanced': 'text-purple-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="max-w-4xl mx-auto pb-12"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
        <Link to="/" className="hover:text-[var(--color-accent)] transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3 h-3" />
          Roadmap
        </Link>
        <span>/</span>
        <span style={{ color: 'var(--color-text-secondary)' }}>{CATEGORY_LABELS[mod.phase]}</span>
        <span>/</span>
        <span style={{ color: 'var(--color-text-primary)' }}>{mod.title}</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{mod.title}</h1>
          <button
            onClick={() => toggleModuleComplete(mod.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
              completed
                ? 'bg-[hsl(142,71%,45%)]/15 border-[hsl(142,71%,45%)]/40 text-[hsl(142,71%,45%)]'
                : 'border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:border-[hsl(142,71%,45%)] hover:text-[hsl(142,71%,45%)]'
            }`}
          >
            {completed ? <><Check className="w-4 h-4 inline mr-1.5" />Completed</> : 'Mark Complete'}
          </button>
        </div>

        <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-text-secondary)' }}>{mod.description}</p>

        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
            <Clock className="w-3.5 h-3.5" /> {mod.estimatedHours}h
          </span>
          {mod.careerLevel && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full font-medium" style={{ color: CAREER_LEVEL_COLORS[mod.careerLevel], background: `${CAREER_LEVEL_COLORS[mod.careerLevel]}15` }}>
              {CAREER_LEVEL_LABELS[mod.careerLevel]}
            </span>
          )}
          <span className={`flex items-center gap-1 ${importanceColors[mod.importance]}`}>
            <Star className="w-3.5 h-3.5" /> {mod.importance.replace('-', ' ')}
          </span>
          {mod.difficulty === 'advanced' && (
            <span className="flex items-center gap-1 text-red-400">
              <Flame className="w-3.5 h-3.5" /> Advanced
            </span>
          )}
          <span className="flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }} title={mod.interviewRecommendation || INTERVIEW_IMPORTANCE_LABELS[mod.interviewImportance || mod.interviewWeight] || ''}>
            Interview: {'★'.repeat(mod.interviewImportance || mod.interviewWeight)}{'☆'.repeat(5 - (mod.interviewImportance || mod.interviewWeight))}
          </span>
          {mod.productionImportance !== undefined && (
            <span className="flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
              Production: {'★'.repeat(mod.productionImportance)}{'☆'.repeat(5 - mod.productionImportance)}
            </span>
          )}
          {mp?.quizScore !== undefined && (
            <span className={`flex items-center gap-1 ${mp.quizScore >= 80 ? 'text-green-400' : mp.quizScore >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
              Quiz: {mp.quizScore}%
            </span>
          )}
        </div>
        {mod.interviewRecommendation && (
          <p className="text-xs mt-2 px-2.5 py-1 rounded-md inline-block" style={{ background: 'var(--color-bg-surface)', color: 'var(--color-text-secondary)' }}>
            💡 {mod.interviewRecommendation}
          </p>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[var(--color-accent)] text-[var(--color-accent)]'
                : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
            {tab.count !== undefined && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: 'var(--color-bg-surface)' }}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {mod.problemItSolves && (
              <section>
                <h3 className="text-base font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                  <AlertTriangle className="w-4 h-4 text-red-400" /> The Problem
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{mod.problemItSolves}</p>
              </section>
            )}
            {mod.whyItExists && (
              <section>
                <h3 className="text-base font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                  <Lightbulb className="w-4 h-4 text-amber-400" /> Why This Exists
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{mod.whyItExists}</p>
              </section>
            )}
            {mod.realWorldUsage && (
              <section>
                <h3 className="text-base font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                  <Rocket className="w-4 h-4 text-blue-400" /> Real-World Usage
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{mod.realWorldUsage}</p>
              </section>
            )}
            {mod.learningObjectives.length > 0 && (
              <section>
                <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>Learning Objectives</h3>
                <ul className="space-y-2">
                  {mod.learningObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      <span className="text-[var(--color-accent)] mt-0.5">▸</span>
                      {obj}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {mod.prerequisites.length > 0 && (
              <section>
                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Prerequisites</h3>
                <div className="flex flex-wrap gap-2">
                  {mod.prerequisites.map(p => {
                    const prereq = modules.find(m => m.id === p);
                    return (
                      <Link
                        key={p}
                        to={`/module/${p}`}
                        className="text-xs px-2.5 py-1.5 rounded-lg border transition-colors hover:border-[var(--color-accent)]"
                        style={{
                          background: isCompleted(p) ? 'hsl(142,71%,45%,0.1)' : 'var(--color-bg-surface)',
                          borderColor: isCompleted(p) ? 'hsl(142,71%,45%,0.3)' : 'var(--color-border-default)',
                          color: isCompleted(p) ? 'hsl(142,71%,45%)' : 'var(--color-text-secondary)',
                        }}
                      >
                        {isCompleted(p) && <Check className="w-3 h-3 inline mr-1" />}
                        {prereq?.title || p}
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
            {mod.commonMistakes && mod.commonMistakes.length > 0 && (
              <section>
                <h3 className="text-base font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                  <AlertTriangle className="w-4 h-4 text-amber-400" /> Common Mistakes
                </h3>
                <ul className="space-y-2">
                  {mod.commonMistakes.map((mistake, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      <span className="text-red-400 mt-0.5">✕</span>
                      {mistake}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {mod.summary && (
              <section className="rounded-lg border p-4" style={{ background: 'var(--color-bg-surface)', borderColor: 'var(--color-border-default)' }}>
                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Summary</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{mod.summary}</p>
              </section>
            )}
          </div>
        )}

        {activeTab === 'theory' && (
          <div className="markdown-body">
            {mod.theory ? (
              <ReactMarkdown>{mod.theory}</ReactMarkdown>
            ) : (
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Theory content coming soon.</p>
            )}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-6">
            {[
              { key: 'docs', label: 'Documentation', icon: FileText, items: mod.resources.docs },
              { key: 'youtube', label: 'YouTube', icon: Video, items: mod.resources.youtube },
              { key: 'udemy', label: 'Udemy', icon: GraduationCap, items: mod.resources.udemy },
              { key: 'articles', label: 'Articles', icon: ExternalLink, items: mod.resources.articles },
            ].filter(r => r.items.length > 0).map(section => (
              <section key={section.key}>
                <h3 className="text-base font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                  <section.icon className="w-4 h-4" /> {section.label}
                </h3>
                <div className="grid gap-2">
                  {section.items.map((item, i) => (
                    <a
                      key={i}
                      href={item.url || `https://www.google.com/search?q=${encodeURIComponent(item.title + ('author' in item && item.author ? ' ' + item.author : ''))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-3 rounded-lg border transition-all duration-200 hover:border-[var(--color-accent)] group"
                      style={{
                        background: 'var(--color-bg-card)',
                        borderColor: 'var(--color-border-default)',
                      }}
                    >
                      <div>
                        <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item.title}</div>
                        {'author' in item && item.author && (
                          <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>by {item.author as string}</div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {'duration' in item && item.duration && (
                          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{item.duration as string}</span>
                        )}
                        <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-accent)' }} />
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            ))}
            {Object.values(mod.resources).every((arr: any) => arr.length === 0) && (
              <p className="text-sm py-8 text-center" style={{ color: 'var(--color-text-muted)' }}>Resources coming soon. Check back later!</p>
            )}
          </div>
        )}

        {activeTab === 'project' && mod.miniProject && (
          <div className="rounded-xl border p-6" style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-default)' }}>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>{mod.miniProject.title}</h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  ~{mod.miniProject.estimatedHours}h · {mod.miniProject.skills.join(', ')}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>{mod.miniProject.description}</p>
            <div className="flex flex-wrap gap-2">
              {mod.miniProject.skills.map(skill => (
                <span
                  key={skill}
                  className="text-xs px-2.5 py-1 rounded-md"
                  style={{ background: 'var(--color-accent-muted)', color: 'var(--color-accent)' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'exercises' && (
          <div className="space-y-2">
            {mod.exercises.map((ex, i) => {
              const done = mp?.exercisesCompleted.includes(ex);
              return (
                <button
                  key={i}
                  onClick={() => toggleExercise(mod.id, ex)}
                  className="w-full flex items-start gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left hover:border-[var(--color-accent)]/30"
                  style={{
                    background: done ? 'hsl(142,71%,45%,0.05)' : 'var(--color-bg-card)',
                    borderColor: done ? 'hsl(142,71%,45%,0.2)' : 'var(--color-border-default)',
                  }}
                >
                  {done
                    ? <CheckSquare className="w-4 h-4 mt-0.5 flex-shrink-0 text-[hsl(142,71%,45%)]" />
                    : <Square className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--color-text-muted)]" />
                  }
                  <span className={`text-sm ${done ? 'line-through' : ''}`} style={{ color: done ? 'var(--color-text-muted)' : 'var(--color-text-secondary)' }}>
                    {ex}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {activeTab === 'quiz' && quiz && (
          <ModuleQuiz
            quiz={quiz}
            previousScore={mp?.quizScore}
            onComplete={(score) => saveQuizScore(mod.id, score)}
          />
        )}

        {activeTab === 'flashcards' && mod.flashcards && mod.flashcards.length > 0 && (
          <FlashcardViewer flashcards={mod.flashcards} />
        )}

        {activeTab === 'interview-q' && mod.interviewQuestions && mod.interviewQuestions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-base font-semibold flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
              <MessageSquare className="w-4 h-4" /> Common Interview Questions
            </h3>
            {mod.interviewQuestions.map((q, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-4 py-3 rounded-lg border"
                style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-default)' }}
              >
                <span className="text-xs font-bold flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'var(--color-accent-muted)', color: 'var(--color-accent)' }}>
                  {i + 1}
                </span>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{q}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPreview(false)}
                  className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${!showPreview ? 'bg-[var(--color-accent-muted)] text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => setShowPreview(true)}
                  className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${showPreview ? 'bg-[var(--color-accent-muted)] text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'}`}
                >
                  Preview
                </button>
              </div>
              <button
                onClick={exportNotes}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-colors hover:bg-[var(--color-bg-surface)]"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <Download className="w-3 h-3" /> Export .md
              </button>
            </div>
            {showPreview ? (
              <div className="markdown-body rounded-lg border p-4 min-h-[300px]" style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-default)' }}>
                {notesDraft ? <ReactMarkdown>{notesDraft}</ReactMarkdown> : <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>No notes yet.</p>}
              </div>
            ) : (
              <textarea
                value={notesDraft}
                onChange={e => setNotesDraft(e.target.value)}
                placeholder="Write your notes in Markdown..."
                className="w-full min-h-[300px] rounded-lg border p-4 text-sm resize-y outline-none focus:border-[var(--color-accent)] transition-colors font-mono"
                style={{
                  background: 'var(--color-bg-card)',
                  borderColor: 'var(--color-border-default)',
                  color: 'var(--color-text-primary)',
                }}
              />
            )}
            <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>Auto-saved to browser storage</p>
          </div>
        )}
      </motion.div>

      {/* Prev/Next Navigation */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
        {prevMod ? (
          <Link
            to={`/module/${prevMod.id}`}
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-[var(--color-accent)]"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <ChevronLeft className="w-4 h-4" /> {prevMod.title}
          </Link>
        ) : <div />}
        {nextMod ? (
          <Link
            to={`/module/${nextMod.id}`}
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-[var(--color-accent)]"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {nextMod.title} <ChevronRight className="w-4 h-4" />
          </Link>
        ) : <div />}
      </div>
    </motion.div>
  );
}

// ─── Flashcard Viewer ───────────────────────────────────────────

function FlashcardViewer({ flashcards }: { flashcards: { front: string; back: string }[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = flashcards[index];

  const next = () => { setFlipped(false); setTimeout(() => setIndex(i => (i + 1) % flashcards.length), 150); };
  const prev = () => { setFlipped(false); setTimeout(() => setIndex(i => (i - 1 + flashcards.length) % flashcards.length), 150); };
  const shuffle = () => { setFlipped(false); setTimeout(() => setIndex(Math.floor(Math.random() * flashcards.length)), 150); };

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
        Card {index + 1} of {flashcards.length} · Click to flip
      </p>

      <div
        onClick={() => setFlipped(f => !f)}
        className="w-full max-w-lg cursor-pointer"
        style={{ perspective: '1000px' }}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="relative rounded-xl border min-h-[200px]"
          style={{
            transformStyle: 'preserve-3d',
            background: 'var(--color-bg-card)',
            borderColor: flipped ? 'hsl(142, 71%, 45%, 0.4)' : 'var(--color-border-default)',
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex items-center justify-center p-8 text-center"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <p className="text-base font-medium" style={{ color: 'var(--color-text-primary)' }}>{card.front}</p>
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 flex items-center justify-center p-8 text-center"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{card.back}</p>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={prev} className="px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors hover:border-[var(--color-accent)]" style={{ borderColor: 'var(--color-border-default)', color: 'var(--color-text-secondary)' }}>
          <ChevronLeft className="w-4 h-4 inline" /> Prev
        </button>
        <button onClick={shuffle} className="px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors hover:border-[var(--color-accent)]" style={{ borderColor: 'var(--color-border-default)', color: 'var(--color-text-secondary)' }}>
          <RotateCcw className="w-3.5 h-3.5 inline mr-1" /> Shuffle
        </button>
        <button onClick={next} className="px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors hover:border-[var(--color-accent)]" style={{ borderColor: 'var(--color-border-default)', color: 'var(--color-text-secondary)' }}>
          Next <ChevronRight className="w-4 h-4 inline" />
        </button>
      </div>
    </div>
  );
}
