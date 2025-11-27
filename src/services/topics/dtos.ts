import type {
  PaginatedQueryResponse,
  PaginatedQueryRequest,
  Topic,
} from '../../types';

export type GetAllTopicsRequest = PaginatedQueryRequest & {
  subjectId?: string;
};

export type GetAllTopicsResponse = PaginatedQueryResponse<Topic>;

export type CreateTopicRequest = {
  subjectId: string;
  name: string;
  description?: string;
  tags: Array<string>;
};

export type CreateTopicResponse = {
  _id: string;
  subjectId: string;
  name: string;
  description?: string;
  tags: Array<string>;
};
