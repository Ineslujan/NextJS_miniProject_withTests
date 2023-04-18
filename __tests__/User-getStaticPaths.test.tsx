import { getStaticPaths } from '../pages/users/[user]';

describe('User getStaticPaths', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  const users = [{
    username: 'Lili',
    id: 9,
    name: 'VINCE',
    email: 'lili.vince@mail.com',
    website: 'thewebsite.fr',
    phone: '+32796357633',
  },
  {
    username: 'Jules',
    id: 5,
    name: 'GRATE',
    email: 'jules.grate@mail.com',
    website: 'thesuperwebsite.fr',
    phone: '+32753875634',
  }];

  const paths = [
    {
      params: {
        user: '9',
      },
    },
    {
      params: {
        user: '5',
      },
    },
  ];

  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(users),
  })) as jest.Mock;

  test('fetch should be called one time', async () => {
    const value = await getStaticPaths();

    expect(value).toBeDefined();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('should returns the good paths', async () => {
    const value = await getStaticPaths();

    expect(value).toEqual({
      paths,
      fallback: false,
    });
  });

  test('should call getDatas()', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(users),
    })) as jest.Mock;

    await getStaticPaths();

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith('https://jsonplaceholder.typicode.com/users');
  });
});
