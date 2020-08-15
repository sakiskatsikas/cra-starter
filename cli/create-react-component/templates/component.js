/* eslint no-console: 0 */
import fs from 'fs';
import chalk from 'chalk';

const styleImport = (name) => `
import { Styled${name} } from './${name}.sc';`;
const contextImport = (name) => `
import { ${name}Provider, use${name}State, use${name}Dispatch } from './${name}Context';`;

const contextRender = (name) => `
  const {} = use${name}State();
  const dispatch = use${name}Dispatch();`;

const styledRender = (name, isContainer) =>
  `(
    <Styled${name}>
      This is the ${name} component content
      ${isContainer ? `{children}` : ``}
    </Styled${name}>
  );`;
const unstyledRender = (name) => `<div>This is the ${name} component content</div>`;

const childrenAsProps = `
interface Props {
  children: ReactNode;
}
`;

const contextExport = (name) => `
export default ({ children, ...rest }: Props) => (
  <${name}Provider>
    <${name} {...rest}>{children}</${name}>
  </${name}Provider>
);
`;
const defaultExport = (name) => `
export default ${name};`;

// Generate the component, with conditionally added styled component and context usage
function generateComponent(name, withStyle, withContext, isContainer) {
  return `import React, { FC${withContext || isContainer ? `, ReactNode` : ``} } from 'react';${
    withStyle || isContainer ? styleImport(name) : ``
  }${withContext ? contextImport(name) : ``}
${withContext || isContainer ? childrenAsProps : ``}
const ${name}: FC${isContainer ? `<Props>` : ``} = (${isContainer ? `{ children }` : ``}) => {${
    withContext ? contextRender(name) : ''
  }
  return ${withStyle || isContainer ? styledRender(name, isContainer) : unstyledRender(name)}
};
${withContext ? contextExport(name) : defaultExport(name)}`;
}

function generateIndex(name) {
  return `import ${name} from './${name}';

export default ${name};
`;
}

export default function createComponent(options, basePath) {
  const { componentName, directory, style, context, container } = options;
  const content = generateComponent(componentName, style, context, container);
  const name = `${basePath}/${directory}/${componentName}/${componentName}.tsx`;
  fs.writeFile(name, content, (err) => {
    if (err) throw err;
    console.log(`%s ${componentName}.tsx`, chalk.green.bold('Created:'));
  });

  const indexContent = generateIndex(componentName);
  const indexName = `${basePath}/${directory}/${componentName}/index.ts`;
  fs.writeFile(indexName, indexContent, (err) => {
    if (err) throw err;
    console.log(`%s index.ts`, chalk.green.bold('Created:'));
  });
}
