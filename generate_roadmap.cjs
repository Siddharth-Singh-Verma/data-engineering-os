const fs = require('fs');

const modules = JSON.parse(fs.readFileSync('src/data/modules.json', 'utf8'));

const nodes = [];
const edges = [];

const ROW_LENGTH = 4;
const X_SPACING = 350;
const Y_SPACING = 200;

for (let i = 0; i < modules.length; i++) {
  const mod = modules[i];
  
  // Calculate row and col for a snake-like layout
  const row = Math.floor(i / ROW_LENGTH);
  const col = row % 2 === 0 ? (i % ROW_LENGTH) : (ROW_LENGTH - 1 - (i % ROW_LENGTH));
  
  const x = col * X_SPACING + 100;
  const y = row * Y_SPACING + 100;

  nodes.push({
    id: mod.id,
    position: { x, y },
    data: { moduleId: mod.id, category: mod.phase }
  });

  if (i > 0) {
    edges.push({
      id: `e-${modules[i-1].id}-${mod.id}`,
      source: modules[i-1].id,
      target: mod.id
    });
  }
}

const roadmapData = { nodes, edges };
fs.writeFileSync('src/data/roadmap.json', JSON.stringify(roadmapData, null, 2));
console.log(`Generated roadmap.json with ${nodes.length} nodes and ${edges.length} edges`);
