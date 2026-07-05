import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { PlayCircle } from 'lucide-react';

interface TimelineNodeData {
  moduleId: string;
  isCompleted?: boolean;
  isStarted?: boolean;
}

export const TimelineNode = memo(({ data }: NodeProps) => {
  const d = data as unknown as TimelineNodeData;

  return (
    <div className="flex items-center justify-center relative w-6 h-6">
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0 !w-1 !h-1" />
      
      {d.isStarted && !d.isCompleted ? (
        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.4)]">
          <PlayCircle className="w-4 h-4 text-white fill-white" />
        </div>
      ) : d.isCompleted ? (
        <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-[var(--color-bg-card)] shadow-sm" />
      ) : (
        <div className="w-4 h-4 rounded-full bg-[var(--color-bg-surface)] border-2 border-[var(--color-border-subtle)] shadow-sm" />
      )}
      
      {/* Horizontal handles for connecting to the actual card */}
      <Handle type="source" id="right" position={Position.Right} className="!bg-transparent !border-0 !w-1 !h-1" />
      <Handle type="source" id="left" position={Position.Left} className="!bg-transparent !border-0 !w-1 !h-1" />
      <Handle type="source" id="bottom" position={Position.Bottom} className="!bg-transparent !border-0 !w-1 !h-1" />
    </div>
  );
});

TimelineNode.displayName = 'TimelineNode';
