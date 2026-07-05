import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  BackgroundVariant,
  type NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useNavigate } from 'react-router';
import { RoadmapNode } from './RoadmapNode';
import { RoadmapLegend } from './RoadmapLegend';
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
};

export function RoadmapCanvas({ roadmapData, modules, progress, toggleModuleComplete }: RoadmapCanvasProps) {
  const navigate = useNavigate();

  const moduleMap = useMemo(() => {
    const map: Record<string, Module> = {};
    for (const m of modules) map[m.id] = m;
    return map;
  }, [modules]);

  const initialNodes: Node[] = useMemo(() =>
    roadmapData.nodes
      .map(n => {
        const mod = moduleMap[n.data.moduleId];
        const isCompleted = progress.completedModules.includes(n.id);
        const isUnlocked = mod
          ? mod.prerequisites.every(p => progress.completedModules.includes(p))
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
        const sourceCompleted = progress.completedModules.includes(e.source);
        return {
          id: e.id,
          source: e.source,
          target: e.target,
          animated: sourceCompleted,
          style: {
            stroke: sourceCompleted ? 'hsl(142, 71%, 45%)' : 'hsl(220, 15%, 25%)',
            strokeWidth: sourceCompleted ? 2.5 : 1.5,
          },
          type: 'smoothstep',
        };
      }),
    [roadmapData.edges, progress]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

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

      {/* Legend */}
      <RoadmapLegend />
    </div>
  );
}
