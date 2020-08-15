import arg from 'arg';
import inquirer from 'inquirer';
import path from 'path';

export function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--atom': Boolean,
      '--molecule': Boolean,
      '--organism': Boolean,
      '--template': Boolean,
      '--container': Boolean,
      '--page': Boolean,
      '--name': Boolean,
      '--app': Boolean,
      '--style': Boolean,
      '--test': Boolean,
      '--doc': Boolean,
      '--help': Boolean,
      '-a': '--atom',
      '-m': '--molecule',
      '-o': '--organism',
      '-t': '--template',
      '-c': '--container',
      '-p': '--page',
      '-n': '--name',
      '-s': '--style',
      '-j': '--test',
      '-d': '--doc',
      '-h': '--help',
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    atom: args['--atom'] || false,
    molecule: args['--molecule'] || false,
    organism: args['--organism'] || false,
    template: args['--template'] || false,
    container: args['--container'] || false,
    page: args['--page'] || false,
    name: args['--name'] || false,
    style: args['--style'] || false,
    test: args['--test'] || false,
    doc: args['--doc'] || false,
    help: args['--help'] || false,
    componentName: args['--name'] ? args._[0] : undefined,
  };
}

export async function promptForMissingOptions(options) {
  const questions = [];

  if (!options.name) {
    questions.push({
      type: 'input',
      name: 'componentName',
      message: 'What is the Component Name?',
      default: '',
    });
  }

  if (
    !options.atom &&
    !options.molecule &&
    !options.organism &&
    !options.template &&
    !options.container &&
    !options.page
  ) {
    questions.push({
      type: 'list',
      name: 'atomic',
      message: 'Choose Atomic Design Level: ',
      choices: ['Atom', 'Molecule', 'Organism', 'Template', 'Container', 'Page'],
      default: 'Atom',
    });
  }

  if (!options.style) {
    questions.push({
      type: 'confirm',
      name: 'style',
      message: 'Create a Styled Component file?',
      default: true,
    });
  }

  if (!options.test) {
    questions.push({
      type: 'confirm',
      name: 'test',
      message: 'Create a Test file?',
      default: true,
    });
  }

  if (!options.doc) {
    questions.push({
      type: 'confirm',
      name: 'doc',
      message: 'Create a Documentation Markdown file?',
      default: true,
    });
  }

  const pageQuestions = [
    {
      type: 'confirm',
      name: 'context',
      message: 'Create a Page Context file?',
      default: true,
    },
  ];

  function getAtomicAnswer(atomic) {
    const propName = atomic.toLowerCase();
    return { [propName]: true, directory: `${propName}s` };
  }

  function setDirectory() {
    if (options.atom) {
      return { directory: 'atoms' };
    }
    if (options.molecule) {
      return { directory: 'molecules' };
    }
    if (options.organism) {
      return { directory: 'organisms' };
    }
    if (options.template) {
      return { directory: 'templates' };
    }
    if (options.container) {
      return { directory: 'containers' };
    }
    if (options.page) {
      return { directory: 'pages' };
    }
  }

  const answers = await inquirer.prompt(questions);
  const atomicAndDirectory = answers.atomic ? getAtomicAnswer(answers.atomic) : setDirectory();

  const isPage = atomicAndDirectory.directory === 'pages';
  const pageAnswers = isPage ? await inquirer.prompt(pageQuestions) : null;

  const basePath = `${path.dirname(require.main.filename)}/../../../${
    isPage ? `src` : `src/components`
  }`;

  return {
    ...options,
    ...atomicAndDirectory,
    style: options.style || answers.style,
    context: options.context || (pageAnswers && pageAnswers.context),
    test: options.test || answers.test,
    doc: options.doc || answers.doc,
    componentName: options.componentName || answers.componentName,
    basePath,
  };
}
