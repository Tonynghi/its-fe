import { axios } from '../../utils';
import type {
  CreateSubjectRequest,
  CreateSubjectResponse,
  GetAllSubjectsRequest,
  GetAllSubjectsResponse,
} from './dtos';

const route = 'subjects';

export const SubjectsService = {
  getAllSubjects: async ({
    currentPage,
    pageSize,
    search,
  }: GetAllSubjectsRequest) => {
    const url = `${route}/`;

    return await axios.get<GetAllSubjectsResponse>(url, {
      params: {
        currentPage,
        pageSize,
        search,
      },
    });
  },
  createSubject: async (request: CreateSubjectRequest) => {
    const url = `${route}/`;

    return await axios.post<CreateSubjectResponse>(url, request);
  },
};
