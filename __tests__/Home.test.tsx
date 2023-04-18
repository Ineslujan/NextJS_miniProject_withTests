import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Home from '../pages';

test('home', () => {
  render(<Home />);
  const main = within(screen.getByRole('main'));
  const heading = main.getByRole('heading', { level: 1, name: /bienvenue/i });

  expect(heading).toBeDefined();
});
