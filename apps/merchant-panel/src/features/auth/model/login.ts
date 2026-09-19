export type LoginCredentials = {
  principal: string;
  password: string;
};

export type LoginBackofficeResponse = {
  success: boolean;
  doTime: string | null;
  message: string;
  code: number;
  accessCode: string;
  refresh: string;
  userId: number;
  twofactorActive: boolean;
};
