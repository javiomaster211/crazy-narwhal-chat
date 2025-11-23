import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtService } from '../../application/interfaces/jwt.service.interface';
import { JwtPayloadDto } from '../../application/dto/jwt-payload.dto';
@Injectable()
export class NestJwtService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}
  sign(payload: JwtPayloadDto): string {
    return this.jwtService.sign(payload);
  }
  verify(token: string): JwtPayloadDto {
    return this.jwtService.verify<JwtPayloadDto>(token);
  }
}
