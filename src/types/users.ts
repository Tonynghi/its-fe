export enum Role {
  STUDENT = 'STUDENT',
  TUTOR = 'TUTOR',
}

export type User = {
  name: string;
  email: string;
  role: Role;
};
