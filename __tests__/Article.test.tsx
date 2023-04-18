import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Article, { getServerSideProps } from '../pages/blog/[article]';

const post = {
  body: 'Another text for another body', id: 2, title: 'Simple title', userId: 77,
};

describe('Article page', () => {
  beforeEach(() => {
    render(<Article currentData={post} />);
  });

  test('Post should display title', () => {
    const main = within(screen.getByRole('main'));
    const heading = main.getByRole('heading', { level: 1 });

    expect(heading).toBeDefined();
    expect(heading.textContent).toBe(post.title);
  });

  test('Post should display text', () => {
    const main = within(screen.getByRole('main'));
    const text = main.getByTestId('paragraphtest');

    expect(text).toBeDefined();
    expect(text.textContent).toBe(post.body);
  });
});

describe('Article getServerSideProps', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  const onePost = {
    userId: 1,
    id: 2,
    title: 'a mock title',
    body: 'a very long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long mock body',
  };

  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({ onePost }),
  })) as jest.Mock;

  test('fetch should be called one time', async () => {
    const context = {
      params: { article: '4' } as ParsedUrlQuery,
    };

    const value = await getServerSideProps(context as GetServerSidePropsContext);

    expect(value).toBeDefined();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  //! Revoir ce test :
  test('should returns the good datas', async () => {
    const context = {
      params: { article: '4' } as ParsedUrlQuery,
    };

    const value = await getServerSideProps(context as GetServerSidePropsContext);

    expect(value).toEqual({
      props: {
        currentData: {
          onePost,
        },
      },
    });
  });

  test('should returns the 404 page with no data', async () => {
    global.fetch = jest.fn(() => Promise.resolve(null)) as jest.Mock;

    // Suppress console.error for this test
    const originalConsoleError = console.error;
    console.error = jest.fn();

    const context = {
      params: { article: '4' } as ParsedUrlQuery,
    };

    const value = await getServerSideProps(context as GetServerSidePropsContext);

    expect(value).toEqual({
      notFound: true,
    });

    // Restore console.error
    console.error = originalConsoleError;
  });

  test('should returns the 404 page when URL params is not a number', async () => {
    const context = {
      params: { article: '4d' } as ParsedUrlQuery,
    };

    const value = await getServerSideProps(context as GetServerSidePropsContext);

    expect(value).toEqual({
      notFound: true,
    });
  });

  test('should call getDatas()', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({}),
    })) as jest.Mock;

    const context = {
      params: { article: '4' } as ParsedUrlQuery,
    };

    await getServerSideProps(context as GetServerSidePropsContext);

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith(`https://jsonplaceholder.typicode.com/posts/${context.params.article}`);
  });
});
