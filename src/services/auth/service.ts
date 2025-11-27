import { axios } from '../../utils';
import type { SignInRequest, SignInResponse } from './dtos';

const route = 'auth';

export const AuthService = {
  signIn: async (request: SignInRequest) => {
    const url = `${route}/sign-in`;

    return await axios.post<SignInResponse>(url, request);
  },
};
