import { useState } from 'react';
import { NavLink } from 'react-router';
import { ChevronRight, ChevronDown, Circle, CheckCircle2 } from 'lucide-react';
import type { Module, UserProgress } from '@/types';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/types';

interface TopicsTreeProps {
  modules: Module[];
  progress: UserProgress;
  onClose: () => void;
}

export function TopicsTree({ modules, progress, onClose }: TopicsTreeProps) {
  // Group modules by phase
  const groupedModules = modules.reduce((acc, module) => {
    if (!acc[module.phase]) {
      acc[module.phase] = [];
    }
    acc[module.phase].push(module);
    return acc;
  }, {} as Record<string, Module[]>);

  // Keep track of which phases are expanded
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({});

  const togglePhase = (phase: string) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phase]: !prev[phase]
    }));
  };

  return (
    <div className="flex flex-col gap-1 mt-4">
      <div className="px-3 mb-2">
        <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
          Curriculum
        </span>
      </div>
      
      {Object.entries(groupedModules).map(([phase, phaseModules]) => {
        const isExpanded = expandedPhases[phase] || false;
        const colorData = CATEGORY_COLORS[phase] || { text: 'text-gray-400' };
        
        // Calculate progress for this phase
        const completedCount = phaseModules.filter(m => progress.completedModules.includes(m.id)).length;
        const totalCount = phaseModules.length;
        const isAllCompleted = completedCount === totalCount;
        
        return (
          <div key={phase} className="flex flex-col">
            <button
              onClick={() => togglePhase(phase)}
              className="flex items-center justify-between px-3 py-1.5 hover:bg-[var(--color-bg-card-hover)] transition-colors rounded-lg group"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--color-text-muted)' }} />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--color-text-muted)' }} />
                )}
                <span 
                  className={`text-xs font-medium truncate group-hover:${colorData.text}`}
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {CATEGORY_LABELS[phase] || phase}
                </span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[var(--color-bg-surface)] shrink-0" style={{ color: 'var(--color-text-muted)' }}>
                {completedCount}/{totalCount}
              </span>
            </button>
            
            {isExpanded && (
              <div className="flex flex-col ml-5 mt-1 border-l pl-2 pb-2 gap-1" style={{ borderColor: 'var(--color-border-subtle)' }}>
                {phaseModules.map(module => {
                  const isCompleted = progress.completedModules.includes(module.id);
                  const isStarted = progress.moduleProgress[module.id]?.started;
                  
                  return (
                    <NavLink
                      key={module.id}
                      to={`/module/${module.id}`}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-colors ${
                          isActive
                            ? 'bg-[var(--color-accent-muted)]'
                            : 'hover:bg-[var(--color-bg-card-hover)]'
                        }`
                      }
                      style={({ isActive }) => ({
                        color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                      })}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-3 h-3 shrink-0 text-emerald-500" />
                      ) : isStarted ? (
                        <Circle className="w-3 h-3 shrink-0" style={{ color: 'var(--color-accent)' }} />
                      ) : (
                        <Circle className="w-3 h-3 shrink-0" style={{ color: 'var(--color-text-muted)' }} />
                      )}
                      <span className="truncate leading-tight">
                        {module.title}
                      </span>
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
