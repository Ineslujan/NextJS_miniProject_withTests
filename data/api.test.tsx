import api from './api';

describe('Testing api constant', () => {
  test('Api url is not empty', () => {
    expect(api).toBeDefined();
    expect(api).toBeTruthy();
  });

  test('Api url start with "https://"', () => {
    expect(api).toMatch(/^https:\/\//);
  });

  test('Api url ends with "/"', () => {
    expect(api).toMatch(/\/$/);
  });
});
