import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { RegisterUseCase } from './application/use-cases/register.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';

import { PrismaUserRepository } from './infraestructure/repositories/prisma-user.repository';

import { NestJwtService } from './infraestructure/services/nest-jwt.service';

import { JwtStrategy } from './infraestructure/strategies/jwt.strategy';

import { AuthResolver } from './infraestructure/graphql/resolvers/auth.resolver';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mycatisfat',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    AuthResolver,
    RegisterUseCase,
    LoginUseCase,
    { provide: 'IUserRepository', useClass: PrismaUserRepository },
    { provide: 'IJwtService', useClass: NestJwtService },
    JwtStrategy,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
