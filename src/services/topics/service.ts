import { axios } from '../../utils';
import type {
  CreateTopicRequest,
  CreateTopicResponse,
  GetAllTopicsRequest,
  GetAllTopicsResponse,
} from './dtos';

const route = 'topics';

export const TopicsService = {
  getAllTopics: async ({
    currentPage,
    pageSize,
    search,
    subjectId,
  }: GetAllTopicsRequest) => {
    const url = `${route}/`;

    return await axios.get<GetAllTopicsResponse>(url, {
      params: {
        currentPage,
        pageSize,
        search,
        subjectId,
      },
    });
  },
  createTopic: async (request: CreateTopicRequest) => {
    const url = `${route}/`;

    return await axios.post<CreateTopicResponse>(url, request);
  },
};
