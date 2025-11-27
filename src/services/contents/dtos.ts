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

export type GetUploadUrlRequest = {
  fileName: string;
  mimeType: string;
  subjectId: string;
};

export type GetUploadUrlResponse = {
  presignedUrl: string;
  bucket: string;
  objectName: string;
};

export type PostContentRequest = {
  name: string;
  description: string;
  bucket: string;
  objectName: string;
  subjectId: string;
  topicIds: Array<string>;
  userId: string;
};

export type PostContentResponse = {
  _id: string;
  name: string;
  description: string;
  bucket: string;
  objectName: string;
};
