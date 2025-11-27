import { axios } from '../../utils';
import type { GetMyProfileResponse } from './dtos';

const route = 'users';

export const UsersService = {
  getMyProfile: async () => {
    const url = `${route}/me`;

    return await axios.get<GetMyProfileResponse>(url);
  },
};
