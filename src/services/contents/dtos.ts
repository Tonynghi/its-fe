import type {
  PaginatedQueryResponse,
  PaginatedQueryRequest,
  LearningContent,
} from '../../types';

export type GetAllLearningContentsRequest = PaginatedQueryRequest & {
  subjectId?: string;
};

export type GetAllLearningContentsResponse =
  PaginatedQueryResponse<LearningContent>;

export type GetDownloadUrlRequest = {
  id: string;
};

export type GetDownloadUrlResponse = {
  url: string;
};
