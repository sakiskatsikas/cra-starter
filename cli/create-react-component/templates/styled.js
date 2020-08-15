/* eslint no-console: 0 */
import fs from 'fs';
import chalk from 'chalk';

function generateStyled(name) {
  return `import styled from '@emotion/styled/macro';

export const Styled${name} = styled.div\`
  background: currentColor;
\`;
`;
}

export default function createStyled(options, basePath) {
  const { componentName, directory } = options;
  const content = generateStyled(componentName);
  const name = `${basePath}/${directory}/${componentName}/${componentName}.sc.ts`;
  fs.writeFile(name, content, err => {
    if (err) throw err;
    console.log(`%s ${componentName}.sc.ts`, chalk.green.bold('Created:'));
  });
}
