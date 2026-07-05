import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  TrendingUp, Clock, BookOpen, Award, Flame, Target,
  CheckCircle2, AlertTriangle, BarChart3, Calendar,
  Briefcase, ArrowRight, Layers, FileText, Rocket
} from 'lucide-react';
import type { DashboardStats } from '@/hooks/useStats';
import type { Module } from '@/types';
import { CATEGORY_LABELS, CAREER_LEVEL_LABELS, CAREER_LEVEL_COLORS } from '@/types';

interface DashboardPageProps {
  stats: DashboardStats;
  modules: Module[];
}

function ProgressRing({ percent, size = 120, stroke = 8, color = 'var(--color-accent)' }: { percent: number; size?: number; stroke?: number; color?: string }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="var(--color-bg-surface)" strokeWidth={stroke} />
        <motion.circle
          cx={size/2} cy={size/2} r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{percent}%</span>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, subtext, color, delay = 0 }: {
  icon: React.ElementType; label: string; value: string | number; subtext?: string; color: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="rounded-xl border p-4"
      style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-default)' }}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
          <Icon className="w-4.5 h-4.5" style={{ color }} />
        </div>
        <div>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{label}</p>
          <p className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>{value}</p>
          {subtext && <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{subtext}</p>}
        </div>
      </div>
    </motion.div>
  );
}

function StreakCalendar({ studyDays }: { studyDays: string[] }) {
  const today = new Date();
  const days: { date: string; active: boolean }[] = [];
  for (let i = 83; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const ds = d.toISOString().split('T')[0];
    days.push({ date: ds, active: studyDays.includes(ds) });
  }

  return (
    <div className="rounded-xl border p-4" style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-default)' }}>
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
        <Calendar className="w-4 h-4" /> Study Activity
      </h3>
      <div className="grid grid-cols-[repeat(12,1fr)] gap-1">
        {days.map(day => (
          <div
            key={day.date}
            className="aspect-square rounded-sm transition-colors"
            title={day.date}
            style={{
              background: day.active ? 'hsl(142,71%,45%)' : 'var(--color-bg-surface)',
              opacity: day.active ? 1 : 0.4,
            }}
          />
        ))}
      </div>
      <p className="text-[10px] mt-2" style={{ color: 'var(--color-text-muted)' }}>Last 12 weeks</p>
    </div>
  );
}

export function DashboardPage({ stats, modules }: DashboardPageProps) {
  const careerColor = CAREER_LEVEL_COLORS[stats.currentCareerLevel];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto space-y-6"
    >
      {/* Hero section */}
      <div className="flex flex-col md:flex-row items-center gap-8 rounded-xl border p-6"
        style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-default)' }}
      >
        <ProgressRing percent={stats.progressPercent} size={140} stroke={10} />
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
            {stats.progressPercent === 0 ? 'Ready to begin?' : stats.progressPercent < 25 ? 'Getting started!' : stats.progressPercent < 50 ? 'Making progress!' : stats.progressPercent < 75 ? 'Over halfway there!' : stats.progressPercent < 100 ? 'Almost there!' : 'Journey complete! 🎉'}
          </h2>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            {stats.completedCount} of {stats.totalModules} modules completed
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ color: careerColor, background: `${careerColor}15` }}>
              {CAREER_LEVEL_LABELS[stats.currentCareerLevel]}
            </span>
          </div>
        </div>
      </div>

      {/* Recommended Next */}
      {stats.recommendedNext && (
        <Link
          to={`/module/${stats.recommendedNext.id}`}
          className="block rounded-xl border p-4 transition-all duration-200 hover:border-[var(--color-accent)]"
          style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-default)' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Rocket className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-medium" style={{ color: 'var(--color-text-muted)' }}>Recommended Next</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{stats.recommendedNext.title}</p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{CATEGORY_LABELS[stats.recommendedNext.phase] || stats.recommendedNext.phase}</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
          </div>
        </Link>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={CheckCircle2} label="Completed" value={stats.completedCount} subtext={`of ${stats.totalModules}`} color="hsl(142,71%,45%)" delay={0.05} />
        <StatCard icon={Clock} label="Hours Logged" value={stats.hoursLogged} subtext={`of ~${stats.totalHours}h`} color="hsl(217,91%,60%)" delay={0.1} />
        <StatCard icon={Flame} label="Study Streak" value={`${stats.currentStreak}d`} subtext={`${stats.studyDays} total days`} color="hsl(25,90%,55%)" delay={0.15} />
        <StatCard icon={Award} label="Avg Quiz" value={stats.avgQuizScore ? `${stats.avgQuizScore}%` : '—'} color="hsl(270,60%,60%)" delay={0.2} />
      </div>

      {/* Readiness Meters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl border p-4" style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-default)' }}>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
            <Target className="w-4 h-4 text-amber-400" /> Interview Readiness
          </h3>
          <div className="h-2 rounded-full mb-2" style={{ background: 'var(--color-bg-surface)' }}>
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${stats.interviewReadiness}%`, background: 'linear-gradient(90deg, hsl(38,92%,50%), hsl(25,90%,55%))' }} />
          </div>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{stats.interviewReadiness}% based on interview-weighted topics</p>
        </div>
        <div className="rounded-xl border p-4" style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-default)' }}>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
            <FileText className="w-4 h-4 text-blue-400" /> Resume Readiness
          </h3>
          <div className="h-2 rounded-full mb-2" style={{ background: 'var(--color-bg-surface)' }}>
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${stats.resumeReadiness}%`, background: 'linear-gradient(90deg, hsl(217,91%,60%), hsl(230,60%,60%))' }} />
          </div>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{stats.resumeReadiness}% · {stats.projectsCompleted}/{stats.totalProjects} projects done</p>
        </div>
        <div className="rounded-xl border p-4" style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-default)' }}>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
            <TrendingUp className="w-4 h-4 text-green-400" /> Must-Know Progress
          </h3>
          <div className="h-2 rounded-full mb-2" style={{ background: 'var(--color-bg-surface)' }}>
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${stats.mustKnowProgress}%`, background: 'linear-gradient(90deg, hsl(142,71%,45%), hsl(172,60%,45%))' }} />
          </div>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{stats.mustKnowProgress}% of critical topics completed</p>
        </div>
      </div>

      {/* Phase Progress */}
      <div className="rounded-xl border p-4" style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-default)' }}>
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
          <BarChart3 className="w-4 h-4" /> Phase Progress
        </h3>
        <div className="space-y-3">
          {Object.entries(stats.phaseProgress).map(([phase, data]) => (
            <div key={phase}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                  {CATEGORY_LABELS[phase] || phase}
                </span>
                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {data.completed}/{data.total}
                </span>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: 'var(--color-bg-surface)' }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${data.percent}%`,
                    background: data.percent === 100 ? 'hsl(142,71%,45%)' : 'var(--color-accent)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Streak Calendar */}
        <StreakCalendar studyDays={stats.studyDaysList || []} />

        {/* Weak Areas */}
        <div className="rounded-xl border p-4" style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-default)' }}>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
            <AlertTriangle className="w-4 h-4 text-amber-400" /> Needs Improvement
          </h3>
          {stats.weakAreas.length === 0 ? (
            <p className="text-xs py-4 text-center" style={{ color: 'var(--color-text-muted)' }}>
              {stats.avgQuizScore > 0 ? 'All quiz scores are above 60%! 🎉' : 'Take quizzes to identify weak areas'}
            </p>
          ) : (
            <div className="space-y-2">
              {stats.weakAreas.map(area => (
                <Link
                  key={area.moduleId}
                  to={`/module/${area.moduleId}`}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors hover:bg-[var(--color-bg-card-hover)]"
                >
                  <span style={{ color: 'var(--color-text-secondary)' }}>{area.title}</span>
                  <span className="text-xs text-red-400">{area.reason}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Modules */}
      {stats.recentModules.length > 0 && (
        <div className="rounded-xl border p-4" style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-default)' }}>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
            <BookOpen className="w-4 h-4" /> Recently Visited
          </h3>
          <div className="flex flex-wrap gap-2">
            {stats.recentModules.map(id => {
              const mod = modules.find(m => m.id === id);
              return mod ? (
                <Link
                  key={id}
                  to={`/module/${id}`}
                  className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:border-[var(--color-accent)]"
                  style={{ background: 'var(--color-bg-surface)', borderColor: 'var(--color-border-default)', color: 'var(--color-text-secondary)' }}
                >
                  {mod.title}
                </Link>
              ) : null;
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
