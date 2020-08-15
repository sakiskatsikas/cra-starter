/* eslint no-console: 0 */
import fs from 'fs';
import chalk from 'chalk';

function generateContext(name) {
  return `import React, { createContext, useContext, useReducer, Dispatch, FC, ReactNode } from 'react';

interface State {}

interface Props {
  children: ReactNode;
}

interface Action {
  type: '' | '';
}

const initialState: State = {};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case '':
      return { ...state };

    default:
      return state;
  }
};

const ${name}StateContext = createContext(initialState);
const ${name}DispatchContext = createContext((() => 0) as Dispatch<Action>);

const ${name}Provider: FC<Props> = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <${name}DispatchContext.Provider value={dispatch}>
      <${name}StateContext.Provider value={state}>{children}</${name}StateContext.Provider>
    </${name}DispatchContext.Provider>
  );
};

function use${name}State() {
  const context = useContext(${name}StateContext);
  if (context === undefined) {
    throw new Error('use${name}State must be used within a ${name}Provider');
  }
  return context;
}

function use${name}Dispatch() {
  const context = useContext(${name}DispatchContext);
  if (context === undefined) {
    throw new Error('use${name}Dispatch must be used within a ${name}Provider');
  }
  return context;
}

export { ${name}Provider, use${name}State, use${name}Dispatch };`;
}

export default function createContext(options, basePath) {
  const { componentName, directory } = options;
  const content = generateContext(componentName);
  const fileName = `${componentName}Context.tsx`;
  const name = `${basePath}/${directory}/${componentName}/${fileName}`;
  fs.writeFile(name, content, (err) => {
    if (err) throw err;
    console.log(`%s ${fileName}`, chalk.green.bold('Created:'));
  });
}
