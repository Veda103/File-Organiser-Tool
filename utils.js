const fs = require('fs').promises;
const path = require('path');

const categories = {
  Images: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'],
  Documents: ['.pdf', '.docx', '.doc', '.txt', '.xlsx', '.pptx'],
  Videos: ['.mp4', '.mkv', '.avi', '.mov', '.wmv'],
};

function getCategory(ext) {
  for (const [category, extensions] of Object.entries(categories)) {
    if (extensions.includes(ext)) return category;
  }
  return 'Others';
}

async function ensureDirExists(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

module.exports = { getCategory, ensureDirExists };