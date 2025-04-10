#!/usr/bin/env node
const path = require('path');
const fs = require('fs').promises;
const { getCategory, ensureDirExists } = require('./utils');

const summaryFile = path.join(__dirname, 'summary.txt');

async function organizeFiles(dirPath) {
  try {
    const files = await fs.readdir(dirPath, { withFileTypes: true });

    for (const file of files) {
      if (file.isFile()) {
        const ext = path.extname(file.name).toLowerCase();
        const category = getCategory(ext);
        const categoryPath = path.join(dirPath, category);

        await ensureDirExists(categoryPath);

        const oldPath = path.join(dirPath, file.name);
        const newPath = path.join(categoryPath, file.name);

        await fs.rename(oldPath, newPath);

        const log = `Moved "${file.name}" to "${category}/"`;
        console.log(log);
        await fs.appendFile(summaryFile, log + '\n');
      }
    }

    console.log('\n✅ File organization completed.');
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

// Read CLI input
const inputDir = process.argv[2];
if (!inputDir) {
  console.error('⚠️ Please provide a directory path.\nUsage: node organizer.js <path>');
  process.exit(1);
}

organizeFiles(path.resolve(inputDir));