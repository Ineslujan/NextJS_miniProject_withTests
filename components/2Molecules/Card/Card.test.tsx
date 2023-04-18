import React from 'react';
import {
  cleanup, render, screen, within,
} from '@testing-library/react';
import Card from './Card';

describe('Testing Card Component', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    render(<Card
      title="The title"
      subTitle="a subtitle"
      text="this text is a paragraph"
      infoLink={{
        name: 'Link',
        path: 'path',
      }}
      limit={2}
    />);
  });

  test('Card/Article is displayed and contains subTitle', () => {
    const selectArticle = within(screen.getByRole('article'));
    const article = selectArticle.getByRole('heading', { level: 3 });

    expect(article).toBeDefined();
    expect(article.textContent).toMatch(/subtitle/i);
  });
});
