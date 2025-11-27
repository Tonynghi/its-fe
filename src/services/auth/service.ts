import { axios } from '../../utils';
import type {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from './dtos';

const route = 'auth';

export const AuthService = {
  signIn: async (request: SignInRequest) => {
    const url = `${route}/sign-in`;

    return await axios.post<SignInResponse>(url, request);
  },
  signUp: async (request: SignUpRequest) => {
    const url = `${route}/sign-up`;

    return await axios.post<SignUpResponse>(url, request);
  },
};
