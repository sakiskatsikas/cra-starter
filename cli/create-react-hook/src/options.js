import arg from 'arg';
import inquirer from 'inquirer';
import path from 'path';

export function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--name': Boolean,
      '--doc': Boolean,
      '-n': '--name',
      '-d': '--doc',
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    name: args['--name'] || false,
    doc: args['--doc'] || args['--full'] || false,
  };
}

export async function promptForMissingOptions(options) {
  const questions = [];

  if (!options.name) {
    questions.push({
      type: 'input',
      name: 'hookName',
      message: 'What is the Hook Name?',
      default: 'use',
    });
  }

  if (!options.doc && !options.full && !options.remove) {
    questions.push({
      type: 'confirm',
      name: 'doc',
      message: 'Create a Documentation Markdown file?',
      default: true,
    });
  }

  const answers = await inquirer.prompt(questions);

  const basePath = `${path.dirname(require.main.filename)}/../../../src/hooks`;

  return {
    ...options,
    doc: options.doc || answers.doc,
    hookName: options.hookName || answers.hookName,
    basePath,
  };
}
