import { JwtPayloadDto } from '../dto/jwt-payload.dto';

export interface IJwtService {
  sign(payload: JwtPayloadDto): string;
  verify(token: string): JwtPayloadDto;
}
