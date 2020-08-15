import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

test('renders the component', () => {
  const { getByText } = render(<Header />);
  const componentText = getByText(/this is the Header component content/i);
  expect(componentText).toBeInTheDocument();
});
