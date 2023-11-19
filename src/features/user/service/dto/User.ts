export interface User {
  _id: string;
  email: string;
  username: string;
  displayName?: string | undefined;
  dateOfBirth: Date;
  createdAt: Date;
  updatedAt: Date;
}
