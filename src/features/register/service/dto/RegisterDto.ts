export interface RegisterDto {
  email: string;
  password: string;
  dateOfBirth: Date;
  displayName?: string | undefined;
  username: string;
}
