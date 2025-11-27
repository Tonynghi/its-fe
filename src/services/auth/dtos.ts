import type { Role } from '../../types';

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignInResponse = {
  accessToken: string;
};

export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

export type SignUpResponse = {
  accessToken: string;
};
