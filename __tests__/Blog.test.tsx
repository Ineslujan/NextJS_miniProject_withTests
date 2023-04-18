import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Blog, { getStaticProps } from '../pages/blog';

const posts = [
  {
    body: 'Some text for the body', id: 1, title: 'A little title', userId: 23,
  },
  {
    body: 'Another text for another body', id: 2, title: 'Simple title', userId: 77,
  },
];

describe('Blog page', () => {
  beforeEach(() => {
    render(<Blog posts={posts} />);
  });

  test('The title should exist and contains "blog"', () => {
    const main = within(screen.getByRole('main'));
    const heading = main.getByRole('heading', { level: 1 });

    expect(heading).toBeDefined();
    expect(heading.textContent).toMatch(/blog/i);
  });

  test(`Should return ${posts.length} posts`, () => {
    const main = within(screen.getByRole('main'));
    const articles = main.getAllByRole('article');

    expect(articles).toBeDefined();
    expect(articles.length).toBe(posts.length);
  });

  test('Posts should display title', () => {
    const main = within(screen.getByRole('main'));
    const articles = main.getAllByRole('article');

    articles.forEach((article, i) => {
      const title = article.firstChild;

      expect(title?.nodeName).toBe('H2');
      expect(title?.textContent).toBe(posts[i].title);
    });
  });

  test('Posts should have the good path', () => {
    const main = within(screen.getByRole('main'));
    const articles = main.getAllByRole('link');

    articles.forEach((article, i) => {
      const link = article.getAttribute('href');

      expect(link).toBeDefined();
      expect(link).toBe(`/blog/${posts[i].id}`);
    });
  });
});

describe('Blog getStaticProps', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(posts),
  })) as jest.Mock;

  test('fetch should be called one time', async () => {
    const value = await getStaticProps();

    expect(value).toBeDefined();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('should returns the good datas', async () => {
    const value = await getStaticProps();

    expect(value).toEqual({
      props: {
        posts,
      },
    });
  });

  // test('should returns 404 page with no data', async () => {
  //   global.fetch = jest.fn(() => Promise.resolve(null)) as jest.Mock;

  //   // Suppress console.error for this test
  //   const originalConsoleError = console.error;
  //   console.error = jest.fn();

  //   const value = await getStaticProps();

  //   expect(value).toEqual({
  //     notFound: true,
  //   });

  //   // Restore console.error
  //   console.error = originalConsoleError;
  // });

  test('should call getDatas()', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve([]),
    })) as jest.Mock;

    await getStaticProps();

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://jsonplaceholder.typicode.com/posts');
  });
});
