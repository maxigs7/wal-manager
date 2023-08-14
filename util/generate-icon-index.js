const fs = require('fs');
const path = require('path');

const folderPath = './src/assets/icons/';

fs.readdir(folderPath, (err, folders) => {
  if (err) {
    console.error('Error reading icons folder:', err);
    return;
  }

  folders.forEach((dir) => {
    if (!fs.statSync(path.join(folderPath, dir)).isDirectory()) return;
    const exports = [];
    const files = fs.readdirSync(path.join(folderPath, dir));

    files.forEach((file) => {
      const iconName = path.basename(file, '.svg'); // Adjust the extension if needed
      if (iconName === 'index.ts') {
        return;
      }
      const pascalCaseIconName = iconName.replace(/(^\w|-\w)/g, (matches) =>
        matches.slice(-1).toUpperCase(),
      );
      const exportStatement = `export { default as ${pascalCaseIconName}Icon } from './${dir}/${iconName}.svg';`;
      exports.push(exportStatement);
    });

    const indexFilePath = path.join(folderPath, dir, 'index.ts');
    const indexContent = exports.join('\n');

    fs.writeFile(indexFilePath, indexContent, (err) => {
      if (err) {
        console.error('Error generating index.ts file:', err);
        return;
      }

      console.log('index.ts file generated successfully!');
    });
  });
});
