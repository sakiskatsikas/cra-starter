import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

test('renders the component', () => {
  const { container } = render(<Header />);
  expect(container.children.length).not.toBe(0);
});
