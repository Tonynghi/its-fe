import type {
  PaginatedQueryResponse,
  PaginatedQueryRequest,
  Subject,
} from '../../types';

export type GetAllSubjectsRequest = PaginatedQueryRequest;

export type GetAllSubjectsResponse = PaginatedQueryResponse<Subject>;

export type CreateSubjectRequest = {
  name: string;
  description?: string;
};

export type CreateSubjectResponse = {
  _id: string;
  name: string;
  description?: string;
};
