import React from 'react';
import { render } from '@testing-library/react';
import Main from './Main';

test('renders the component', () => {
  const { container } = render(<Main />);
  expect(container.children.length).not.toBe(0);
});
