import { describe, expect, it } from 'vitest';
import { normalizePage } from './page';

describe('normalizePage', () => {
  it('maps Club items + totalElements', () => {
    expect(
      normalizePage({ items: [{ id: 1 }], totalElements: 125, totalPages: 13 }),
    ).toEqual({
      items: [{ id: 1 }],
      total: 125,
    });
  });

  it('does not treat totalPages or pages as record count', () => {
    expect(normalizePage({ items: [], totalPages: 13, pages: 13 })).toEqual({
      items: [],
      total: 0,
    });
  });

  it('maps Spring-style content', () => {
    expect(normalizePage({ content: [{ id: 2 }], totalElements: 3 })).toEqual({
      items: [{ id: 2 }],
      total: 3,
    });
  });

  it('treats a bare array as the item list', () => {
    expect(normalizePage([{ id: 9 }])).toEqual({ items: [{ id: 9 }], total: 1 });
  });
});
