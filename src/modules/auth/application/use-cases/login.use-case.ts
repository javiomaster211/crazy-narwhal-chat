import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { IJwtService } from '../interfaces/jwt.service.interface';
import { LoginDto } from '../dto/login.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';

@Injectable()
export class LoginUserCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtService: IJwtService,
  ) {}
  async execute(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayloadDto = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return { user, accessToken };
  }
}
