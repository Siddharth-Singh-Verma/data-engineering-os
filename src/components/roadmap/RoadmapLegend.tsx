import { Check, Circle, Lock } from 'lucide-react';

export function RoadmapLegend() {
  return (
    <div className="absolute bottom-4 right-4 z-10 bg-[var(--color-bg-card)] border border-[var(--color-border-default)] rounded-xl p-3 shadow-lg">
      <h4 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">Legend</h4>
      <div className="flex flex-col gap-1.5 text-xs">
        <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
          <div className="w-4 h-4 rounded-full bg-[hsl(142,71%,45%)] flex items-center justify-center">
            <Check className="w-2.5 h-2.5 text-white" />
          </div>
          Completed
        </div>
        <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
          <div className="w-4 h-4 rounded-full border-2 border-[var(--color-accent)] flex items-center justify-center">
            <Circle className="w-2 h-2 text-[var(--color-accent)] fill-current" />
          </div>
          In Progress
        </div>
        <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
          <div className="w-4 h-4 rounded-full border-2 border-[var(--color-border-default)] flex items-center justify-center">
            <Lock className="w-2 h-2 text-[var(--color-text-muted)]" />
          </div>
          Locked
        </div>
      </div>
    </div>
  );
}
