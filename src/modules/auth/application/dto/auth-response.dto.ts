import { AuthUser } from '../../domain/entities/auth-user.entity';
export class AuthResponseDto {
  user: AuthUser;
  accessToken: string;
}
