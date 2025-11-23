import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { IJwtService } from '../interfaces/jwt.service.interface';
import { LoginDto } from '../dto/login.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IJwtService')
    private readonly jwtService: IJwtService,
  ) {}
  async execute(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.validateCredentials(
      dto.email,
      dto.password,
    );
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
