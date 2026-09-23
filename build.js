const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'public');

// Ensure output directory is clean
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
}
fs.mkdirSync(outputDir, { recursive: true });

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      copyRecursive(path.join(src, file), path.join(dest, file));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Copy all static site files to public directory
const itemsToCopy = ['index.html', 'about.html', 'assets', 'css', 'js', 'stitch_source.html'];
for (const item of itemsToCopy) {
  const srcPath = path.join(__dirname, item);
  if (fs.existsSync(srcPath)) {
    copyRecursive(srcPath, path.join(outputDir, item));
  }
}

console.log('Build completed: all static files and assets copied to public/');
