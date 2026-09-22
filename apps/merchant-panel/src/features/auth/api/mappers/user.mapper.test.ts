import { describe, expect, it } from 'vitest';
import { userMeMock } from '../user.mock';
import { mapCurrentUser } from './user.mapper';

describe('mapCurrentUser', () => {
  it('maps the me envelope and keeps a null avatar when empty', () => {
    expect(mapCurrentUser(userMeMock)).toEqual({
      id: '356089',
      username: 'azadeh',
      firstName: '',
      lastName: '',
      fullName: 'tara_panel_test',
      mobile: '09121234567',
      avatar: null,
    });
  });

  it('falls back to a null avatar when the property is missing', () => {
    expect(mapCurrentUser({ data: { id: 1, fullName: 'کاربر تست' } }).avatar).toBeNull();
  });

  it('maps userId and avatarUrl aliases', () => {
    expect(
      mapCurrentUser({
        userId: 12,
        avatarUrl: 'https://cdn.example/user.png',
      }),
    ).toMatchObject({
      id: '12',
      avatar: 'https://cdn.example/user.png',
    });
  });
});
