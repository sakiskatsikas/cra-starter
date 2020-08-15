/* eslint no-console: 0 */
import fs from 'fs';
import chalk from 'chalk';

function generateDoc(name) {
  return `### Example

\`\`\`js
import { ${name} } from 'dse-components/hooks';

const MyFC = () => {
  const hook = ${name}();
};
\`\`\`
`;
}

export default function createDoc(options, basePath) {
  const { hookName } = options;
  const content = generateDoc(hookName);
  const name = `${basePath}/${hookName}/${hookName}.md`;
  fs.writeFile(name, content, (err) => {
    if (err) throw err;
    console.log(`%s ${hookName}.md`, chalk.green.bold('Created:'));
  });
}
