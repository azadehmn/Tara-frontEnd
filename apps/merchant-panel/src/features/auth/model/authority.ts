export type UserAuthority = {
  id?: number;
  key: string;
  title?: string;
  cat?: string;
  description?: string;
  deactivated?: boolean;
  status?: boolean;
  disabled?: boolean;
};

export type UserAuthoritiesResponse = UserAuthority[];
