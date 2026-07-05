import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { Check, Lock, Clock, Flame, Star, PlayCircle, Circle } from 'lucide-react';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/types';

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
  align: 'left' | 'right';
  onToggleComplete: (id: string) => void;
  onNavigate: (id: string) => void;
}

export const RoadmapNode = memo(({ data }: NodeProps) => {
  const d = data as unknown as RoadmapNodeDataType;
  const isLocked = !d.isUnlocked && !d.isCompleted;
  
  // Status logic
  let status = 'UPCOMING';
  if (d.isCompleted) status = 'COMPLETED';
  else if (isLocked) status = 'LOCKED';
  else if (d.isStarted) status = 'IN PROGRESS';

  const statusColor = d.isCompleted 
    ? 'text-emerald-500' 
    : isLocked 
      ? 'text-[var(--color-text-muted)]' 
      : d.isStarted 
        ? 'text-blue-500' 
        : 'text-[var(--color-text-muted)]';

  const catColors = CATEGORY_COLORS[d.category] || CATEGORY_COLORS.foundation;
  
  // We mimic the screenshot's specific blue badge for 'In Progress', 
  // but if we use category colors, we can make it dynamic based on category
  // Let's use a very subdued version of the category color for the badge
  const badgeClasses = `${catColors.bg} ${catColors.text}`;

  return (
    <div
      className="group relative"
      style={{
        opacity: isLocked ? 0.5 : 1,
        filter: isLocked ? 'grayscale(0.5)' : 'none',
        width: '340px', // Wider card like DataVidhya
      }}
    >
      {/* Horizontal handles for timeline connections */}
      <Handle type="target" id="left" position={Position.Left} className="!bg-transparent !border-0 !w-1 !h-1" />
      <Handle type="target" id="right" position={Position.Right} className="!bg-transparent !border-0 !w-1 !h-1" />

      <div
        className={`relative rounded-2xl border bg-[var(--color-bg-card)] transition-all duration-300 overflow-hidden flex flex-col ${d.isCompleted ? 'border-emerald-500/30' : d.isStarted ? 'border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]' : 'border-[var(--color-border-default)] shadow-sm'}`}
      >
        {/* Header section (Light Gray) */}
        <div className="flex items-center justify-between px-4 py-3 bg-[var(--color-bg-surface)] border-b border-[var(--color-border-subtle)]">
          <div className="flex items-center gap-3">
            <span className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase ${badgeClasses}`}>
              {CATEGORY_LABELS[d.category] || d.category}
            </span>
            <h3 
              className="text-sm font-semibold truncate max-w-[150px] cursor-pointer hover:text-[var(--color-accent)] transition-colors" 
              style={{ color: 'var(--color-text-primary)' }} 
              title={d.title}
              onClick={(e) => {
                e.stopPropagation();
                if (!isLocked) d.onNavigate(d.moduleId);
              }}
            >
              {d.title}
            </h3>
          </div>
          <span className={`text-[9px] font-bold tracking-wider uppercase ${statusColor}`}>
            {status}
          </span>
        </div>

        {/* Body section (White) */}
        <div className="flex flex-col p-1 bg-[var(--color-bg-card)]">
          {/* Row 1: Content/Importance */}
          <div 
            className="flex items-center justify-between px-3 py-2.5 hover:bg-[var(--color-bg-surface)] rounded-xl transition-colors cursor-pointer"
            onClick={() => { if (!isLocked) d.onNavigate(d.moduleId); }}
          >
            <div className="flex items-center gap-3">
              {d.isCompleted ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : d.isStarted ? (
                <PlayCircle className="w-4 h-4 text-blue-500 fill-blue-500/20" />
              ) : isLocked ? (
                <Lock className="w-4 h-4 text-[var(--color-text-muted)]" />
              ) : (
                <Circle className="w-4 h-4 text-[var(--color-border-default)]" />
              )}
              <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                {d.title} Topics
              </span>
            </div>
            <span className="text-[11px] flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
              {d.estimatedHours}h <span className="text-[10px] ml-0.5">›</span>
            </span>
          </div>

          {/* Row 2: Difficulty */}
          <div 
            className="flex items-center justify-between px-3 py-2.5 hover:bg-[var(--color-bg-surface)] rounded-xl transition-colors cursor-pointer"
            onClick={() => { if (!isLocked) d.onNavigate(d.moduleId); }}
          >
            <div className="flex items-center gap-3">
              <Circle className="w-4 h-4 text-[var(--color-border-subtle)]" />
              <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                Practical Exercises
              </span>
            </div>
            <span className="text-[11px] flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
              {d.difficulty} <span className="text-[10px] ml-0.5">›</span>
            </span>
          </div>
        </div>
        
        {/* Footer actions */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--color-bg-surface)] border-t border-[var(--color-border-subtle)]">
          <span className="text-[10px] font-medium" style={{ color: 'var(--color-text-muted)' }}>
            {d.importance === 'must-know' ? '★ Must Know' : d.importance === 'advanced' ? '🔥 Advanced' : 'Good to Know'}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isLocked) d.onToggleComplete(d.moduleId);
            }}
            className={`flex items-center gap-1.5 px-2 py-1 rounded border transition-colors text-[10px] font-medium ${
              d.isCompleted 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/20' 
                : 'bg-[var(--color-bg-card)] border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-muted)]'
            }`}
          >
            {d.isCompleted ? (
              <>
                <Check className="w-3 h-3" />
                Completed
              </>
            ) : (
              <>
                <Circle className="w-3 h-3" />
                Mark Complete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

RoadmapNode.displayName = 'RoadmapNode';
