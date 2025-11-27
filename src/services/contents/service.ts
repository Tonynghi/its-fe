import { axios } from '../../utils';
import type {
  GetAllLearningContentsRequest,
  GetAllLearningContentsResponse,
  GetDownloadUrlRequest,
  GetDownloadUrlResponse,
} from './dtos';

const route = 'content';

export const LearningContentsService = {
  getAllContents: async ({
    currentPage,
    pageSize,
    search,
    subjectId,
  }: GetAllLearningContentsRequest) => {
    const url = `${route}/`;

    return await axios.get<GetAllLearningContentsResponse>(url, {
      params: {
        currentPage,
        pageSize,
        search,
        subjectId,
      },
    });
  },
  getDownloadUrl: async ({ id }: GetDownloadUrlRequest) => {
    const url = `${route}/${id}/download`;

    return await axios.get<GetDownloadUrlResponse>(url);
  },
};
