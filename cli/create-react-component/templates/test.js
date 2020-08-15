/* eslint no-console: 0 */
import fs from 'fs';
import chalk from 'chalk';

function generateTest(name) {
  return `import React from 'react';
import { render } from '@testing-library/react';
import ${name} from './${name}';

test('renders the component', () => {
  const { getByText } = render(<${name} />);
  const componentText = getByText(/this is the ${name} component content/i);
  expect(componentText).toBeInTheDocument();
});
`;
}

export default function createTest(options, basePath) {
  const { componentName, directory } = options;
  const content = generateTest(componentName);
  const name = `${basePath}/${directory}/${componentName}/${componentName}.spec.js`;
  fs.writeFile(name, content, (err) => {
    if (err) throw err;
    console.log(`%s ${componentName}.spec.js`, chalk.green.bold('Created:'));
  });
}
