import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

test('renders welcome message', () => {
  render(<App />);
  expect(screen.getByText(/welcome to react/i)).toBeInTheDocument();
});
