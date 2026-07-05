import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  type Node,
  type Edge,
  BackgroundVariant,
  type NodeTypes,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useNavigate } from 'react-router';
import { RoadmapNode } from './RoadmapNode';
import { TimelineNode } from './TimelineNode';
import type { Module, UserProgress, RoadmapData } from '@/types';
import { CATEGORY_LABELS } from '@/types';

interface RoadmapCanvasProps {
  roadmapData: RoadmapData;
  modules: Module[];
  progress: UserProgress;
  toggleModuleComplete: (id: string) => void;
}

const NODE_TYPES: NodeTypes = {
  roadmapNode: RoadmapNode,
  timelineNode: TimelineNode,
};

function RoadmapCanvasInner({ roadmapData, modules, progress, toggleModuleComplete }: RoadmapCanvasProps) {
  const navigate = useNavigate();
  const { setCenter, getZoom } = useReactFlow();

  const moduleMap = useMemo(() => {
    const map: Record<string, Module> = {};
    for (const m of modules) map[m.id] = m;
    return map;
  }, [modules]);

  const initialNodes: Node[] = useMemo(() =>
    roadmapData.nodes
      .map(n => {
        if (n.type === 'timelineNode') {
          const isCompleted = progress.completedModules.includes(n.data.moduleId as string);
          const isStarted = progress.moduleProgress[n.data.moduleId as string]?.started || false;
          return {
            id: n.id,
            type: 'timelineNode',
            position: n.position,
            data: {
              ...n.data,
              isCompleted,
              isStarted,
            }
          };
        }

        const mod = moduleMap[n.data.moduleId as string];
        const isCompleted = progress.completedModules.includes(n.id);
        const isUnlocked = mod
          ? (mod.prerequisites || []).every(p => progress.completedModules.includes(p))
          : true;
        const isStarted = progress.moduleProgress[n.id]?.started || false;

        return {
          id: n.id,
          type: 'roadmapNode',
          position: n.position,
          data: {
            ...n.data,
            title: mod?.title || n.id,
            estimatedHours: mod?.estimatedHours || 0,
            importance: mod?.importance || 'good-to-know',
            difficulty: mod?.difficulty || 'beginner',
            isCompleted,
            isUnlocked,
            isStarted,
            onToggleComplete: toggleModuleComplete,
            onNavigate: (id: string) => navigate(`/module/${id}`),
          },
        };
      }),
    [roadmapData.nodes, moduleMap, progress, toggleModuleComplete, navigate]
  );

  const initialEdges: Edge[] = useMemo(() =>
    roadmapData.edges
      .map(e => {
        let sourceCompleted = false;
        if (e.source.startsWith('timeline-')) {
          const id = e.source.replace('timeline-', '');
          sourceCompleted = progress.completedModules.includes(id);
        } else {
          sourceCompleted = progress.completedModules.includes(e.source);
        }

        const isSpine = e.id.startsWith('e-spine-');
        const isBranch = e.id.startsWith('e-branch-');

        return {
          id: e.id,
          source: e.source,
          sourceHandle: e.sourceHandle,
          target: e.target,
          targetHandle: e.targetHandle,
          animated: sourceCompleted && !isSpine,
          style: {
            stroke: sourceCompleted ? 'hsl(142, 71%, 45%)' : 'hsl(220, 15%, 25%)',
            strokeWidth: sourceCompleted ? 2.5 : 1.5,
            strokeDasharray: isSpine || isBranch ? '5 5' : 'none', // Dashed lines for timeline
          },
          type: e.type || 'smoothstep',
        };
      }),
    [roadmapData.edges, progress]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    
    // Auto-center on first incomplete module
    const timer = setTimeout(() => {
      const targetNode = initialNodes.find(n => {
        const d = n.data as any;
        return !d.isCompleted && d.isUnlocked;
      });
      
      if (targetNode) {
        // Center on the target node (adjusting for 340px width and ~150px height) and set a comfortable default zoom
        setCenter(targetNode.position.x + 170, targetNode.position.y + 75, { zoom: 0.6, duration: 800 });
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [initialNodes, initialEdges, setNodes, setEdges, setCenter, getZoom]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    const mod = moduleMap[node.id];
    // Check if node is unlocked before navigating
    if (mod && node.data && node.data.isUnlocked !== false) {
      navigate(`/module/${node.id}`);
    }
  }, [moduleMap, navigate]);

  // Roadmap component UI

  return (
    <div className="relative w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={NODE_TYPES}
        nodesDraggable={false}
        nodesConnectable={false}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={2}
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="hsl(220, 15%, 15%)" />
        <Controls
          showInteractive={false}
          className="!rounded-xl"
        />
        <MiniMap
          nodeColor={(node) => {
            const cat = (node.data as Record<string, unknown>)?.category as string;
            const colorMap: Record<string, string> = {
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
            return colorMap[cat] || '#666';
          }}
          maskColor="rgba(0,0,0,0.7)"
          pannable
          zoomable
        />
      </ReactFlow>

    </div>
  );
}

export function RoadmapCanvas(props: RoadmapCanvasProps) {
  return (
    <ReactFlowProvider>
      <RoadmapCanvasInner {...props} />
    </ReactFlowProvider>
  );
}
