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

  // Replace URLs
  content = content.replace(/https:\/\/www\.roxannejoiner\.com/g, 'https://www.opticmart.shop');
  content = content.replace(/https:\/\/roxannejoiner\.com/g, 'https://opticmart.shop');
  content = content.replace(/roxannejoiner\.com/g, 'opticmart.shop');
  content = content.replace(/contact@roxannejoiner\.com/g, 'contact@opticmart.shop');

  // Replace Brand Case-Sensitive
  content = content.replace(/RoxanneJoiner/g, 'OpticMart');
  content = content.replace(/Roxanne Joiner/g, 'OpticMart');
  content = content.replace(/roxannejoiner/g, 'opticmart');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${path.relative(SRC_DIR, file)}`);
    modifiedCount++;
  }
}

console.log(`\n🎉 Replaced branding in ${modifiedCount} files in OpticMart/src!`);
