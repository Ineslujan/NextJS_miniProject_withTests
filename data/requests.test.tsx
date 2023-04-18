import getDatas from './requests';

describe('getDatas function', () => {
  // beforeEach(() => {
  //   (global.fetch as jest.Mock).mockClear();
  // });
  describe('Article data collected', () => {
    test('Successful', async () => {
      const onePost = {
        userId: 1,
        id: 2,
        title: 'a mock title',
        body: 'a very long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long mock body',
      };

      const category = 'posts';
      const id = 2;

      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({ onePost }),
      })) as jest.Mock;

      const resultRequest = await getDatas(category, id);

      expect(resultRequest).toBeDefined();
      expect(resultRequest).toEqual({ onePost });
      expect(typeof resultRequest).toBe('object');
      expect(global.fetch).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/${category}/${id}`);
    });

    test('Failed', async () => {
      const category = 'posts';
      const id = 2;

      global.fetch = jest.fn(() => Promise.reject(new Error('API is down'))) as jest.Mock;

      // Suppress console.error for this test
      const originalConsoleError = console.error;
      console.error = jest.fn();

      const resultRequest = await getDatas(category, id);

      expect(resultRequest).toEqual(null);
      expect(typeof resultRequest).toBe('object');
      expect(global.fetch).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/${category}/${id}`);

      // Restore console.error
      console.error = originalConsoleError;
    });
  });

  describe('User data collected', () => {
    test('Successful', async () => {
      const oneUser = {
        username: 'Lili', id: 9, name: 'VINCE', email: 'lili.vince@mail.com', website: 'thewebsite.fr', phone: '+32796357633',
      };

      const category = 'users';
      const id = 9;

      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({ oneUser }),
      })) as jest.Mock;

      const resultRequest = await getDatas(category, id);

      expect(resultRequest).toBeDefined();
      expect(resultRequest).toEqual({ oneUser });
      expect(typeof resultRequest).toBe('object');
      expect(global.fetch).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/${category}/${id}`);
    });

    test('Failed', async () => {
      const category = 'users';
      const id = 9;

      global.fetch = jest.fn(() => Promise.reject(new Error('API is down'))) as jest.Mock;

      // Suppress console.error for this test
      const originalConsoleError = console.error;
      console.error = jest.fn();

      const resultRequest = await getDatas(category, id);

      expect(resultRequest).toEqual(null);
      expect(typeof resultRequest).toBe('object');
      expect(global.fetch).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/${category}/${id}`);

      // Restore console.error
      console.error = originalConsoleError;
    });
  });

  describe('Blog data collected', () => {
    test('Successful', async () => {
      const posts = [{
        userId: 6,
        id: 1,
        title: 'a mock title',
        body: 'a very long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long mock body',
      },
      {
        userId: 1,
        id: 2,
        title: 'another mock title',
        body: 'another very short short short short short short short short short short short short short short short short short short short short short short short short short short short short short short short short short short short mock body',
      }];

      const category = 'posts';

      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(posts),
      })) as jest.Mock;

      const resultRequest = await getDatas(category);

      expect(resultRequest).toBeDefined();
      expect(Array.isArray(resultRequest)).toBeTruthy();
      expect(resultRequest).toEqual(posts);
      expect(global.fetch).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/${category}`);
    });

    test('Failed', async () => {
      const category = 'posts';

      global.fetch = jest.fn(() => Promise.reject(new Error('API is down'))) as jest.Mock;

      // Suppress console.error for this test
      const originalConsoleError = console.error;
      console.error = jest.fn();

      const resultRequest = await getDatas(category);

      expect(resultRequest).toEqual(null);
      expect(typeof resultRequest).toBe('object');
      expect(global.fetch).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/${category}`);

      // Restore console.error
      console.error = originalConsoleError;
    });
  });

  describe('Users data collected', () => {
    test('Successful', async () => {
      const users = [{
        username: 'Ju', id: 7, name: 'LESS', email: 'ju.less@mail.com', website: 'thebigwebsite.fr', phone: '+32765398563',
      },
      {
        username: 'Lili', id: 9, name: 'VINCE', email: 'lili.vince@mail.com', website: 'thewebsite.fr', phone: '+32796357633',
      }];

      const category = 'users';

      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(users),
      })) as jest.Mock;

      const resultRequest = await getDatas(category);

      expect(resultRequest).toBeDefined();
      expect(Array.isArray(resultRequest)).toBeTruthy();
      expect(resultRequest).toEqual(users);
      expect(global.fetch).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/${category}`);
    });

    test('Failed', async () => {
      const category = 'users';

      global.fetch = jest.fn(() => Promise.reject(new Error('API is down'))) as jest.Mock;

      // Suppress console.error for this test
      const originalConsoleError = console.error;
      console.error = jest.fn();

      const resultRequest = await getDatas(category);

      expect(resultRequest).toEqual(null);
      expect(typeof resultRequest).toBe('object');
      expect(global.fetch).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/${category}`);

      // Restore console.error
      console.error = originalConsoleError;
    });
  });
});
