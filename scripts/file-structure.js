const fs = require('fs');
const path = require('path');

function printDirectoryStructure(dirPath, indent = '') {
  // Get the files and directories in the current directory
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    const stats = fs.statSync(fullPath);

    // Print the file/directory
    console.log(indent + file);

    // If it's a directory, recursively print its contents
    if (stats.isDirectory()) {
      printDirectoryStructure(fullPath, indent + '  ');
    }
  });
}

// Specify the root directory (e.g., current working directory or project folder)
const rootDir = path.resolve(__dirname, '../dist/win-unpacked'); // Or specify a different directory

console.log(`Project file structure of ${rootDir}:\n`);
printDirectoryStructure(rootDir);