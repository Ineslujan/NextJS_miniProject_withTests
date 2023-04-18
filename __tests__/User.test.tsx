import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import User, { getStaticProps } from '../pages/users/[user]';

const user = {
  username: 'Lili', id: 3, name: 'VINCE', email: 'lili.vince@mail.com', website: 'thewebsite.fr', phone: '+32796357633',
};

describe('User page', () => {
  beforeEach(() => {
    render(<User currentData={user} />);
  });

  test('Should display the name', () => {
    const main = within(screen.getByRole('main'));
    const heading = main.getByRole('heading', { level: 1 });

    expect(heading).toBeDefined();
    expect(heading.textContent).toBe(user.name);
  });

  test('Should display the username', () => {
    const main = within(screen.getByRole('main'));
    const heading = main.getByRole('heading', { level: 2 });

    expect(heading).toBeDefined();
    expect(heading.textContent).toBe(`Username : ${user.username}`);
  });

  test('Should display datas of the table', () => {
    const main = within(screen.getByRole('table'));
    const paragraphs = main.getAllByTestId('paragraphtest');

    expect(paragraphs[0].textContent).toContain(`Username : ${user.username}`);
    expect(paragraphs[1].textContent).toContain(`Email : ${user.email}`);
    expect(paragraphs[2].textContent).toContain(`Site Web : ${user.website}`);
    expect(paragraphs[3].textContent).toContain(`Téléphone : ${user.phone}`);
  });
});

describe('User getStaticProps', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  const oneUser = {
    username: 'Lili',
    id: 9,
    name: 'VINCE',
    email: 'lili.vince@mail.com',
    website: 'thewebsite.fr',
    phone: '+32796357633',
  };

  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({ oneUser }),
  })) as jest.Mock;

  test('fetch should be called one time', async () => {
    const value = await getStaticProps({} as GetStaticPropsContext);

    expect(value).toBeDefined();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('should returns the good datas', async () => {
    const value = await getStaticProps({} as GetStaticPropsContext);

    expect(value).toEqual({
      props: {
        currentData: {
          oneUser,
        },
      },
    });
  });

  test('should returns 404 page with no data', async () => {
    global.fetch = jest.fn(() => Promise.resolve(null)) as jest.Mock;

    // Suppress console.error for this test
    const originalConsoleError = console.error;
    console.error = jest.fn();

    const value = await getStaticProps({} as GetStaticPropsContext);

    expect(value).toEqual({
      notFound: true,
    });

    // Restore console.error
    console.error = originalConsoleError;
  });

  test('should call getDatas()', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({}),
    })) as jest.Mock;

    const context = {
      params: { user: '4' } as ParsedUrlQuery,
    };

    await getStaticProps(context as GetStaticPropsContext);

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith(`https://jsonplaceholder.typicode.com/users/${context.params.user}`);
  });
});
