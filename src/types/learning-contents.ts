export type Subject = {
  _id: string;
  name: string;
  description?: string;
};

export type Topic = {
  _id: string;
  subject: Subject;
  name: string;
  description?: string;
  tags: Array<string>;
};

export type LearningContent = {
  _id: string;
  name: string;
  description?: string;
  subject: Subject;
  bucket: string;
  topics: Array<Topic>;
  objectName: string;
};
