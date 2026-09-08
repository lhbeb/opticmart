import fs from 'fs';
import path from 'path';

const SRC_DIR = 'C:/Users/mehdi/OneDrive/Desktop/my websites all/OpticMart/src';

function walk(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walk(full));
    } else if (/\.(ts|tsx|js|mjs|json|css|html)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

const allFiles = walk(SRC_DIR);
let modifiedCount = 0;

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Exact Hex replacements (Case-insensitive)
  content = content.replace(/#123E52/gi, '#0F172A');
  content = content.replace(/#0C2C3D/gi, '#020617');
  content = content.replace(/#397F86/gi, '#0284C7');
  content = content.replace(/#2C6268/gi, '#0369A1');
  content = content.replace(/#1F4A50/gi, '#075985');
  content = content.replace(/#55B3BD/gi, '#38BDF8');
  content = content.replace(/#4A99A1/gi, '#0EA5E9');
  content = content.replace(/#F7F3E8/gi, '#F8FAFC');
  content = content.replace(/#F2EEE3/gi, '#F1F5F9');
  content = content.replace(/#DDDCD3/gi, '#E2E8F0');
  content = content.replace(/#526B76/gi, '#64748B');

  // Specific copy replacements for cameras & binoculars
  content = content.replace(/Search kayaks, paddles, accessories\.\.\./g, 'Search cameras, binoculars, lenses, optics...');
  content = content.replace(/Search kayaks, paddles/g, 'Search cameras, binoculars');
  content = content.replace(/Search kayaks/g, 'Search cameras & binoculars');
  content = content.replace(/kayaks and paddling gear for your next adventure on the water/g, 'cameras, binoculars, and precision optics for every adventure');
  content = content.replace(/kayaks and paddling essentials for your next adventure/g, 'cameras, binoculars, and precision optics equipment');
  content = content.replace(/kayak brand inspired by life on the water/g, 'premier dealer for cameras, binoculars, and precision optics');
  content = content.replace(/kayak brand for life on the water/g, 'trusted dealer for professional cameras and binoculars');
  content = content.replace(/kayak brand/g, 'optics & camera dealer');
  content = content.replace(/choosing a kayak/g, 'choosing a camera or binoculars');
  content = content.replace(/OpticMart Kayaks/g, 'OpticMart Optics');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated colors & copy: ${path.relative(SRC_DIR, file)}`);
    modifiedCount++;
  }
}

console.log(`\n🎨 Updated ${modifiedCount} files with new OpticMart colors & branding!`);
