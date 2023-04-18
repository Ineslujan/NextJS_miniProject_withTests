import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Users, { getStaticProps } from '../pages/users';

const users = [
  {
    username: 'Lili', id: 3, name: 'VINCE', email: 'lili.vince@mail.com', website: 'thewebsite.fr', phone: '+32796357633',
  },
  {
    username: 'Hervé', id: 5, name: 'BARTE', email: 'herv.bart@mailail.com', website: 'webs.com', phone: '+32756789248',
  },
];

describe('Users page', () => {
  beforeEach(() => {
    render(<Users users={users} />);
  });

  test('The title should exist and contains "utilisateurs"', () => {
    const main = within(screen.getByRole('main'));
    const heading = main.getByRole('heading', { level: 1 });

    expect(heading).toBeDefined();
    expect(heading.textContent).toMatch(/utilisateurs/i);
  });

  test(`Should return ${users.length} user.s`, () => {
    const main = within(screen.getByRole('main'));
    const articles = main.getAllByRole('article');

    expect(articles).toBeDefined();
    expect(articles.length).toBe(users.length);
  });

  test('Users should display Username', () => {
    const main = within(screen.getByRole('main'));
    const articles = main.getAllByRole('article');

    articles.forEach((article, i) => {
      const username = article.firstChild;

      expect(username?.nodeName).toBe('H2');
      expect(username?.textContent).toBe(users[i].username);
    });
  });

  test('Users should have the good path', () => {
    const main = within(screen.getByRole('main'));
    const articles = main.getAllByRole('link');

    articles.forEach((article, i) => {
      const link = article.getAttribute('href');

      expect(link).toBeDefined();
      expect(link).toBe(`/users/${users[i].id}`);
    });
  });
});

describe('Blog getStaticProps', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(users),
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
        users,
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
      json: () => Promise.resolve({}),
    })) as jest.Mock;

    await getStaticProps();

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://jsonplaceholder.typicode.com/users');
  });
});
