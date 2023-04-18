import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Title from './Title';

describe('Testing OneLink Component', () => {
  afterEach(() => {
    cleanup();
  });

  const text = 'textTitle';
  const level = 3;

  test('heading is displayed', () => {
    render(<Title text={text} level={level} />);
    const heading = screen.getByRole('heading');

    expect(heading).toBeDefined();
    expect(heading.textContent).toEqual(text);
  });

  test('heading has the good level', () => {
    render(<Title text={text} level={level} />);
    const heading = screen.getByRole('heading');

    expect(heading.tagName).toEqual(`H${level}`);
  });
});
