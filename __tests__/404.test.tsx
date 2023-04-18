import React from 'react';
import { render, screen, within } from '@testing-library/react';
import The404 from '../pages/404';

test('404', () => {
  render(<The404 />);
  const main = within(screen.getByRole('main'));
  const div = main.getByRole('generic');

  expect(div).toBeDefined();
  expect(div.textContent).toMatch(/404/i);
});
