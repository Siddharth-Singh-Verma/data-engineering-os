const fs = require('fs');

const modules = JSON.parse(fs.readFileSync('src/data/modules.json', 'utf8'));

const nodes = [];
const edges = [];

const Y_SPACING = 240;
const CENTER_X = 500;
const X_OFFSET = 360; // Distance from center to the left edge of card (card is 340px wide)

for (let i = 0; i < modules.length; i++) {
  const mod = modules[i];
  
  const y = i * Y_SPACING + 100;
  
  // 1. Create the central timeline node
  const timelineNodeId = `timeline-${mod.id}`;
  nodes.push({
    id: timelineNodeId,
    type: 'timelineNode',
    position: { x: CENTER_X, y: y + 80 }, // Center it vertically relative to card
    data: { moduleId: mod.id }
  });
  
  // Connect timeline spine vertically
  if (i > 0) {
    edges.push({
      id: `e-spine-${modules[i-1].id}-${mod.id}`,
      source: `timeline-${modules[i-1].id}`,
      sourceHandle: 'bottom',
      target: timelineNodeId,
      targetHandle: 'top',
      type: 'straight' // Vertical dashed line
    });
  }

  // 2. Create the actual card node
  const isLeft = i % 2 === 0;
  // If left, place it so its right edge is near the center. Card width is 340.
  // Center is 500. Offset is 360. 
  // If Left: x = 500 - 360 = 140. 
  // If Right: x = 500 + (360 - 340) = 520. (Actually we want symmetric padding, so let's just use CENTER_X +/- X_OFFSET)
  // Let's use X_OFFSET = 420.
  // Left: x = 500 - 420 = 80.
  // Right: x = 500 + 80 = 580.
  
  const x = isLeft ? CENTER_X - X_OFFSET : CENTER_X + 80;

  nodes.push({
    id: mod.id,
    type: 'roadmapNode',
    position: { x, y },
    data: { 
      moduleId: mod.id, 
      category: mod.phase,
      align: isLeft ? 'left' : 'right'
    }
  });

  // Connect timeline node to card node horizontally
  edges.push({
    id: `e-branch-${mod.id}`,
    source: timelineNodeId,
    sourceHandle: isLeft ? 'left' : 'right', // Timeline branch out
    target: mod.id,
    targetHandle: isLeft ? 'right' : 'left', // Connect to the side of the card facing the timeline
    type: 'straight' // Horizontal dashed line
  });
}

const roadmapData = { nodes, edges };
fs.writeFileSync('src/data/roadmap.json', JSON.stringify(roadmapData, null, 2));
console.log(`Generated roadmap.json with ${nodes.length} nodes and ${edges.length} edges`);
