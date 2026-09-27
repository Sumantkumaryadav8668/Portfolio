const fs = require('fs');
const path = require('path');

const userHome = 'c:\\Users\\ersum';

function deepSearch(dir, depth = 0) {
  if (depth > 6) return;
  try {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      if (item.startsWith('$') || item === 'AppData' || item === 'node_modules' || item === '.git') continue;
      const fp = path.join(dir, item);
      try {
        const stat = fs.statSync(fp);
        if (stat.isDirectory()) {
          deepSearch(fp, depth + 1);
        } else if (stat.isFile()) {
          const lower = item.toLowerCase();
          if (lower.includes('nptel') || 
              lower.includes('342801517') || 
              lower.includes('542801041') || 
              lower.includes('regional') || 
              lower.includes('mentoring') ||
              lower.includes('pm shri') ||
              lower.includes('volunteer')) {
            console.log('FOUND CERT:', fp, '| Size:', stat.size);
          }
        }
      } catch (e) {}
    }
  } catch (e) {}
}

deepSearch(userHome, 0);
