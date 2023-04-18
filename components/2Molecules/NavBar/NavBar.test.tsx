import React from 'react';
import {
  cleanup, render, screen, within,
} from '@testing-library/react';
import NavBar from './NavBar';

describe('Testing NavBar Component', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    render(<NavBar />);
  });

  test('NavBar is displayed and contains "Accueil"', () => {
    const selectNavBar = within(screen.getByRole('navigation'));
    const navBar = selectNavBar.getAllByRole('link');

    expect(selectNavBar).toBeDefined();
    expect(navBar[0].textContent).toContain('Accueil');
  });
});
