export type CurrentUserDto = {
  id?: number | string;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  mobile?: string | null;
  avatar?: string | null;
};

export type CurrentUserEnvelopeDto = {
  data: CurrentUserDto;
};

export type CurrentUser = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  mobile: string | null;
  avatar: string | null;
};
