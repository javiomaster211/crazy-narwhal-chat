import { AuthUser } from '../entities/auth-user.entity';

export interface IUserRepository {
  findByEmail(email: string): Promise<AuthUser | null>;
  findById(id: number): Promise<AuthUser | null>;
  create(
    email: string,
    hashedPassword: string,
    name: string,
    role: string,
  ): Promise<AuthUser>;
  validateCredentials(
    email: string,
    plainPassword: string,
  ): Promise<AuthUser | null>;
}
