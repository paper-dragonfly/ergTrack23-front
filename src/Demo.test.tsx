// THis is the tests that came with create-react-app

import React from 'react';
import { render, screen } from '@testing-library/react';
import Demo from './Demo';

test('renders learn react link', () => {
  render(<Demo />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
