import { PresenceStatus } from '../../constants/PresenceStatus';

export interface User {
  _id: string;
  email: string;
  username: string;
  displayName?: string | undefined;
  online?: PresenceStatus;
  dateOfBirth: Date;
  createdAt: Date;
  updatedAt: Date;
}
