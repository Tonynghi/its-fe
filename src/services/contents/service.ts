import { axios } from '../../utils';
import baseAxios from 'axios';
import type {
  GetAllLearningContentsRequest,
  GetAllLearningContentsResponse,
  GetDownloadUrlRequest,
  GetDownloadUrlResponse,
  GetUploadUrlRequest,
  GetUploadUrlResponse,
  PostContentRequest,
  PostContentResponse,
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
  getUploadUrl: async (request: GetUploadUrlRequest) => {
    const url = `${route}/url`;

    return await axios.post<GetUploadUrlResponse>(url, request);
  },
  postContent: async (request: PostContentRequest) => {
    const url = `${route}/`;
    return await axios.post<PostContentResponse>(url, request);
  },
  uploadToGoogleCloud: async (file: File, url: string) => {
    return await baseAxios.put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
  },
};
