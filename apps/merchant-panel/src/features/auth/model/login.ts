export type LoginPayload = {
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
  mobile?: string;
};

export type VerifyLoginPayload = {
  token: string;
};

export type VerifyLoginResponse = {
  accessToken: string;
  refreshToken: string;
  tokenType?: string;
  expiryDuration?: number;
  callBack?: string | null;
  channelName?: string | null;
  activeChannel?: string | null;
  mobile?: string | null;
};
