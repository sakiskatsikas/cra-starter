/* eslint no-console: 0 */
import fs from 'fs';
import chalk from 'chalk';
import { parseArgumentsIntoOptions, promptForMissingOptions } from './options';
import createDoc from '../templates/doc';
import createStyled from '../templates/styled';
import createContext from '../templates/context';
import createTest from '../templates/test';
import createComponent from '../templates/component';

function createDirectory(componentPath) {
  if (!fs.existsSync(componentPath)) {
    fs.mkdirSync(componentPath, { recursive: true });
  }
}

function createExport(options) {
  const { basePath, directory, componentName } = options;
  const exportContent = `export { default as ${componentName} } from './${componentName}';\n`;
  const directoryPath = `${basePath}/${directory}/index.ts`;

  fs.appendFile(directoryPath, exportContent, (err) => {
    if (err) throw err;
    console.log(
      `%s An export of the %s component in %s`,
      chalk.green.bold('Appended:'),
      chalk.bgMagenta.black(` <${componentName} /> `),
      chalk.magenta(`${directory}/index.ts`)
    );
  });
}

export async function cli(args) {
  const argOptions = parseArgumentsIntoOptions(args);
  const options = await promptForMissingOptions(argOptions);

  const { doc, componentName, directory, style, context, test, full, basePath } = options;

  if (!/^[A-Z]/.test(componentName)) {
    console.error('%s', chalk.red.bold('The Component Name should start with a Capital Letter'));
    process.exit(1);
  }

  const componentPath = `${basePath}/${directory}/${componentName}`;

  createDirectory(componentPath);
  if (doc || full) createDoc(options, basePath);
  if (style || full) createStyled(options, basePath);
  if (context || full) createContext(options, basePath);
  if (test || full) createTest(options, basePath);

  createComponent(options, basePath);
  createExport(options);

  console.log(
    chalk.green.bold('Check your new component at:'),
    chalk.magenta(`${componentPath}/${componentName}.tsx`)
  );
}
