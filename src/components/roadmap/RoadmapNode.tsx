import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Check, Lock, Clock, Flame, Star } from 'lucide-react';

interface RoadmapNodeDataType {
  moduleId: string;
  category: string;
  title: string;
  estimatedHours: number;
  importance: string;
  difficulty: string;
  isCompleted: boolean;
  isUnlocked: boolean;
  isStarted: boolean;
  onToggleComplete: (id: string) => void;
  onNavigate: (id: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  foundation: 'hsl(155, 60%, 50%)',
  concepts: 'hsl(172, 60%, 45%)',
  architecture: 'hsl(230, 60%, 60%)',
  storage: 'hsl(38, 85%, 55%)',
  distributed: 'hsl(25, 90%, 55%)',
  spark: 'hsl(12, 85%, 55%)',
  databricks: 'hsl(350, 65%, 55%)',
  modeling: 'hsl(330, 65%, 60%)',
  transformation: 'hsl(265, 60%, 60%)',
  orchestration: 'hsl(217, 80%, 60%)',
  streaming: 'hsl(188, 80%, 50%)',
  cloud: 'hsl(200, 80%, 55%)',
  devops: 'hsl(215, 20%, 55%)',
  projects: 'hsl(85, 65%, 50%)',
  'system-design': 'hsl(290, 60%, 60%)',
  interview: 'hsl(45, 85%, 55%)',
};

export const RoadmapNode = memo(({ data }: NodeProps) => {
  const d = data as unknown as RoadmapNodeDataType;
  const color = CATEGORY_COLORS[d.category] || '#666';
  const isLocked = !d.isUnlocked && !d.isCompleted;

  return (
    <div
      className="group relative"
      style={{
        opacity: isLocked ? 0.45 : 1,
        filter: isLocked ? 'grayscale(0.5)' : 'none',
      }}
    >
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0 !w-3 !h-3" />

      <div
        className="relative rounded-xl border-2 px-4 py-3 min-w-[180px] max-w-[220px] transition-all duration-300 cursor-pointer"
        style={{
          background: 'var(--color-bg-card)',
          borderColor: d.isCompleted ? 'hsl(142, 71%, 45%)' : d.isStarted ? color : 'var(--color-border-default)',
          boxShadow: d.isCompleted
            ? '0 0 16px 2px hsla(142, 71%, 45%, 0.2)'
            : d.isStarted
              ? `0 0 16px 2px ${color}33`
              : 'var(--shadow-card)',
        }}
      >
        {/* Completion checkbox */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!isLocked) d.onToggleComplete(d.moduleId);
          }}
          className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200"
          style={{
            background: d.isCompleted ? 'hsl(142, 71%, 45%)' : 'var(--color-bg-card)',
            borderColor: d.isCompleted ? 'hsl(142, 71%, 45%)' : 'var(--color-border-default)',
          }}
        >
          {d.isCompleted && <Check className="w-3.5 h-3.5 text-white" />}
          {isLocked && <Lock className="w-3 h-3 text-[var(--color-text-muted)]" />}
        </button>

        {/* Title */}
        <h3
          className="text-sm font-semibold leading-tight mb-1.5"
          style={{ color: d.isCompleted ? 'hsl(142, 71%, 45%)' : 'var(--color-text-primary)' }}
        >
          {d.title}
        </h3>

        {/* Meta row */}
        <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
          <span className="flex items-center gap-0.5">
            <Clock className="w-3 h-3" />
            {d.estimatedHours}h
          </span>

          {d.importance === 'must-know' && (
            <span className="flex items-center gap-0.5 text-amber-400">
              <Star className="w-3 h-3 fill-current" />
              Must
            </span>
          )}

          {d.difficulty === 'advanced' && (
            <span className="flex items-center gap-0.5 text-red-400">
              <Flame className="w-3 h-3" />
              Adv
            </span>
          )}
        </div>

        {/* Category color bar */}
        <div
          className="absolute bottom-0 left-3 right-3 h-[3px] rounded-b-full"
          style={{ background: color }}
        />
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0 !w-3 !h-3" />
    </div>
  );
});

RoadmapNode.displayName = 'RoadmapNode';
