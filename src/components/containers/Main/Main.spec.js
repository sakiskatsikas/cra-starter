import React from 'react';
import { render } from '@testing-library/react';
import Main from './Main';

test('renders the component', () => {
  const { getByText } = render(<Main />);
  const componentText = getByText(/this is the Main component content/i);
  expect(componentText).toBeInTheDocument();
});
