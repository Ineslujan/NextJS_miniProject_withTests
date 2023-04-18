import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import Paragraph from './Paragraph';

describe('Testing Paragraph Component', () => {
  afterEach(() => {
    cleanup();
  });

  const theRender = (limit: number) => {
    render(<Paragraph text="This is some text for the paragraph" limit={limit} />);
  };

  test('paragraph is displayed', () => {
    theRender(0);
    const element = screen.getByTestId('paragraphtest');
    const expectedText = 'This is some text for the paragraph';

    expect(element).toBeDefined();
    expect(element).toBeTruthy();
    expect(element.textContent).toBe(expectedText);
  });

  test('paragraph with a limit', () => {
    theRender(3);
    const element = screen.getByTestId('paragraphtest');
    const expectedText = 'Thi...';

    expect(element).toBeDefined();
    expect(element).toBeTruthy();
    expect(element.textContent).toBe(expectedText);
  });

  test('paragraph with a limit greater or equal than the paragraph', () => {
    theRender(333);
    const element = screen.getByTestId('paragraphtest');
    const expectedText = 'This is some text for the paragraph';

    expect(element).toBeDefined();
    expect(element).toBeTruthy();
    expect(element.textContent).toBe(expectedText);
  });
});
