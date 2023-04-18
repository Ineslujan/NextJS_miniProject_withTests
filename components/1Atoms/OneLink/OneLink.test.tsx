import React from 'react';

import { cleanup, render, screen } from '@testing-library/react';

import OneLink, { assertNoSlashAtStart } from './OneLink';

describe('Testing OneLink Component', () => {
  afterEach(() => {
    cleanup();
  });

  const infoLink = {
    name: 'menuName',
    path: 'path',
  };

  test('should render the link name', () => {
    render(<OneLink infoLink={infoLink} />);
    const link = screen.getByRole('link');

    expect(link).toBeDefined();
    expect(link.textContent).toEqual(infoLink.name);
  });

  test('should the link start with "/"', () => {
    render(<OneLink infoLink={infoLink} />);
    const link = screen.getByRole('link');

    expect(link).toBeDefined();
    expect(link.getAttribute('href')).toContain(infoLink.path);
    expect(link.getAttribute('href')).toMatch(/^\//);
  });

  test('should not throw an error when the link does not start with a slash', () => {
    expect(() => {
      render(<OneLink infoLink={infoLink} />);
    }).not.toThrow();
  });

  test('should throw an error when the link starts with a slash', () => {
    const errorpath = {
      name: 'menuName',
      path: '/path',
    };

    // Suppress console.error for this test
    const originalConsoleError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(<OneLink infoLink={errorpath} />);
    }).toThrow(/String must not start with a slash/);

    // Restore console.error
    console.error = originalConsoleError;
  });

  test('function should throw an error when the link starts with a slash', () => {
    const errorpath = {
      name: 'menuName',
      path: '/path',
    };

    expect(() => assertNoSlashAtStart(errorpath.path)).toThrowError(/must not start with a slash/);
  });
});
