/* eslint no-console: 0 */
import fs from 'fs';
import chalk from 'chalk';
import { parseArgumentsIntoOptions, promptForMissingOptions } from './options';
import createDoc from '../templates/doc';
import createHook from '../templates/hook';

function createDirectory(hookPath) {
  if (!fs.existsSync(hookPath)) {
    fs.mkdirSync(hookPath, { recursive: true });
  }
}

function createExport(options) {
  const { basePath, hookName } = options;

  const exportContent = `export { default as ${hookName} } from './${hookName}';\n`;
  const directoryPath = `${basePath}/index.ts`;

  fs.appendFile(directoryPath, exportContent, (err) => {
    if (err) throw err;
    console.log(
      `%s An export of the %s hook in %s`,
      chalk.green.bold('Appended:'),
      chalk.bgMagenta.black(`${hookName}`),
      chalk.magenta(`/index.ts`)
    );
  });
}

export async function cli(args) {
  const argOptions = parseArgumentsIntoOptions(args);
  const options = await promptForMissingOptions(argOptions);
  const { doc, hookName, basePath } = options;

  if (!/^use[A-Z]/.test(hookName)) {
    console.error('%s', chalk.red.bold('The Hook name should start with "use"'));
    process.exit(1);
  }

  const hookPath = `${basePath}/${hookName}`;

  createDirectory(hookPath);
  if (doc) createDoc(options, basePath);
  createHook(options, basePath);
  createExport(options);

  console.log(
    chalk.green.bold('Check your new hook at:'),
    chalk.magenta(`${hookPath}/${hookName}.ts`)
  );
}
