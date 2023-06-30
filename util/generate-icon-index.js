const fs = require('fs');
const path = require('path');

const folderPath = './src/modules/shared/icons'; // Replace with your icons folder path

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading icons folder:', err);
    return;
  }

  const exports = [`'use client';`];

  files.forEach((file) => {
    const iconName = path.basename(file, '.tsx'); // Adjust the extension if needed
    if (iconName === 'index.ts') {
      return;
    }
    const pascalCaseIconName = iconName.replace(/(^\w|-\w)/g, (matches) =>
      matches.slice(-1).toUpperCase(),
    );
    const exportStatement = `export { ${pascalCaseIconName}Icon } from './${iconName}';`;
    exports.push(exportStatement);
  });

  const indexFilePath = path.join(folderPath, 'index.ts');
  const indexContent = exports.join('\n');

  fs.writeFile(indexFilePath, indexContent, (err) => {
    if (err) {
      console.error('Error generating index.ts file:', err);
      return;
    }

    console.log('index.ts file generated successfully!');
  });
});
