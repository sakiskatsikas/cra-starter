/* eslint no-console: 0 */
import fs from 'fs';
import chalk from 'chalk';

function generateHook(name) {
  return `import { useState } from 'react';

const ${name} = () => {
  const [state, setState] = useState(null);

  return state;
};

export default ${name};
`;
}

function generateIndex(name) {
  return `import ${name} from './${name}';

export default ${name};
`;
}

export default function createHook(options, basePath) {
  const { hookName } = options;
  const content = generateHook(hookName);
  const name = `${basePath}/${hookName}/${hookName}.ts`;
  fs.writeFile(name, content, (err) => {
    if (err) throw err;
    console.log(`%s ${hookName}.tsx`, chalk.green.bold('Created:'));
  });

  const indexContent = generateIndex(hookName);
  const indexName = `${basePath}/${hookName}/index.ts`;
  fs.writeFile(indexName, indexContent, (err) => {
    if (err) throw err;
    console.log(`%s index.ts`, chalk.green.bold('Created:'));
  });
}
