import { describe, expect, it } from 'vitest';
import { joinUrl, withQuery } from './url';

describe('joinUrl', () => {
  it('keeps a relative Club path for the Vite proxy in development', () => {
    expect(joinUrl('', '/club/api/', 'bo/contract/limited/v1/list')).toBe(
      '/club/api/bo/contract/limited/v1/list',
    );
  });

  it('prefixes the gateway origin in production', () => {
    expect(joinUrl('https://stage.tara-club.ir', '/club/api/v1/', 'report/limited')).toBe(
      'https://stage.tara-club.ir/club/api/v1/report/limited',
    );
  });
});

describe('withQuery', () => {
  it('skips empty query values', () => {
    expect(withQuery('/path', { a: 1, b: '', c: undefined })).toBe('/path?a=1');
  });
});
