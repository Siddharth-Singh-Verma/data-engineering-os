import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  TrendingUp, Clock, Award, Flame, Target,
  CheckCircle2, AlertTriangle, Calendar,
  Briefcase, ArrowRight, Layers, Rocket
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

const CAREER_LEVEL_ORDER = ['foundation', 'junior', 'mid', 'senior', 'architect'] as const;

function DashboardPageInner({ stats }: DashboardPageProps) {
  const nextModule = stats.recommendedNext;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* ─── Hero: Continue Learning ──────────────────────────────── */}
      {nextModule ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl border p-8 flex flex-col md:flex-row items-center gap-8 justify-between"
          style={{ 
            background: 'linear-gradient(135deg, var(--color-bg-card) 0%, var(--color-bg-surface) 100%)',
            borderColor: 'var(--color-border-default)' 
          }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-md" style={{ background: 'var(--color-accent-muted)', color: 'var(--color-accent)' }}>
                Today's Lesson
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                {CATEGORY_LABELS[nextModule.phase as keyof typeof CATEGORY_LABELS] || nextModule.phase}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              {nextModule.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 45 minutes</span>
              <span className="flex items-center gap-1.5"><Rocket className="w-4 h-4" /> Essential</span>
            </div>
          </div>
          
          <div className="relative z-10 shrink-0 w-full md:w-auto">
            <Link
              to={`/module/${nextModule.id}`}
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-white transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-[1.02] active:scale-95 w-full md:w-auto"
              style={{ background: 'var(--color-accent)' }}
            >
              Continue Learning <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border p-8 text-center flex flex-col items-center justify-center"
          style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-default)' }}
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
            <Award className="w-8 h-8 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>You are fully prepared.</h2>
          <p className="max-w-md text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
            You have completed all available modules in the Data Engineering OS. Review your weak areas or take on career projects.
          </p>
        </motion.div>
      )}

      {/* ─── Top Stats Grid ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={TrendingUp} label="Total Progress" value={`${stats.progressPercent}%`} color="var(--color-accent)" delay={0.05} />
        <StatCard icon={CheckCircle2} label="Modules Completed" value={`${stats.completedCount} / ${stats.totalModules}`} color="var(--color-success)" delay={0.1} />
        <StatCard icon={Clock} label="Study Time" value={`${stats.hoursLogged}h`} subtext={`of ${stats.totalHours}h estimated`} color="var(--color-warning)" delay={0.15} />
        <StatCard icon={Flame} label="Current Streak" value={`${stats.currentStreak} Days`} color="hsl(12, 85%, 55%)" delay={0.2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ─── Middle Left: Today's Goal ──────────────────────────────── */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border p-6"
            style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-default)' }}
          >
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
              <Target className="w-5 h-5" style={{ color: 'var(--color-accent)' }} /> Dashboard
            </h2>

            <div className="space-y-6">
              {/* Current Streak */}
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>Current Streak</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{stats.currentStreak} Days</p>
                  </div>
                </div>
              </div>

              <div className="h-px w-full" style={{ background: 'var(--color-border-subtle)' }} />

              {/* Weak Area */}
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>Focus Area</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                      {stats.weakAreas.length > 0 ? stats.weakAreas[0].title : 'Data Modeling'}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Requires review</p>
                  </div>
                </div>
              </div>

              <div className="h-px w-full" style={{ background: 'var(--color-border-subtle)' }} />

              {/* Next Unlock */}
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>Next Unlock</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>E-Commerce Lakehouse</p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Career Project</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── Middle Right: Interview Readiness ───────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border p-6"
            style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border-default)' }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <div className="shrink-0">
                <ProgressRing percent={stats.progressPercent} size={100} stroke={8} />
              </div>
              <div className="flex-1 w-full">
                <h2 className="text-lg font-bold flex items-center gap-2 mb-1" style={{ color: 'var(--color-text-primary)' }}>
                  <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--color-success)' }} /> Interview Readiness
                </h2>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Your granular readiness score based on interview-weighted topics.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(stats.phaseProgress).map(([phaseId, prog]) => {
                if (prog.total === 0) return null;
                const label = CATEGORY_LABELS[phaseId as keyof typeof CATEGORY_LABELS] || phaseId;
                
                let fill = 'var(--color-accent)';
                if (prog.percent >= 90) fill = 'var(--color-success)';
                else if (prog.percent >= 60) fill = 'var(--color-warning)';
                else if (prog.percent > 0) fill = 'var(--color-danger)';
                else fill = 'var(--color-text-muted)';

                return (
                  <div key={phaseId} className="group">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{label}</span>
                      <span className="text-xs font-bold" style={{ color: fill }}>{Math.round(prog.percent)}%</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full overflow-hidden" style={{ background: 'var(--color-bg-surface)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${prog.percent}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full transition-all duration-300 group-hover:brightness-110"
                        style={{ background: fill }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

export function DashboardPage(props: DashboardPageProps) {
  return (
    <div className="animate-fade-in p-6 lg:p-10 pb-24">
      <DashboardPageInner {...props} />
    </div>
  );
}
