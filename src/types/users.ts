export enum Role {
  STUDENT = 'STUDENT',
  TUTOR = 'TUTOR',
}

export type User = {
  _id: string;
  name: string;
  email: string;
  role: Role;
};
