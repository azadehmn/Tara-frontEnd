import { describe, expect, it } from 'vitest';
import { mapContractUser } from './user.mapper';

describe('mapContractUser', () => {
  it('maps Club contractAccount flags into domain status', () => {
    expect(
      mapContractUser({
        id: 41300,
        name: 'مهدی',
        family: 'ابراهیمی',
        mobile: '09203310987',
        nationalCode: '0068548397',
        birthDate: '1984-05-14 11:08:24.259',
        orgProfileInfo: '980401',
        nationality: 'IRANI',
        createdOn: '2026-05-14T11:51:43.653+00:00',
        profileDeactivated: false,
        profileDisabled: false,
        contractAccountDeactivated: false,
        contractAccountDisabled: false,
      }),
    ).toEqual({
      id: 41300,
      name: 'مهدی',
      family: 'ابراهیمی',
      mobile: '09203310987',
      nationalCode: '0068548397',
      birthDate: '1984-05-14 11:08:24.259',
      contractAccountDeactivated: false,
      contractAccountDisabled: false,
    });
  });
});
