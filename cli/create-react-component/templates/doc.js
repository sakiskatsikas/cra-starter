/* eslint no-console: 0 */
import fs from 'fs';
import chalk from 'chalk';

function generateDoc(name) {
  return `### Example

\`\`\`js
  <${name}>
    {'Replace me'}
  </${name}>
\`\`\`
`;
}

export default function createDoc(options, basePath) {
  const { componentName, directory } = options;
  const content = generateDoc(componentName);
  const name = `${basePath}/${directory}/${componentName}/${componentName}.md`;
  fs.writeFile(name, content, err => {
    if (err) throw err;
    console.log(`%s ${componentName}.md`, chalk.green.bold('Created:'));
  });
}
