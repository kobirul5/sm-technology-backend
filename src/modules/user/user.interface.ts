export interface IUser {
  name: string;
  email: string;
  password: string;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
}
