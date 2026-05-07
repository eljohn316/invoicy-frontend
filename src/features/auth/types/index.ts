export type User = {
  id: number;
  profileImage: string | null;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
};

export type UserLoginPayload = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type UserLoginResponse = {
  accessToken: string;
  tokenType: string;
};
