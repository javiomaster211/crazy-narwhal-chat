import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { PrismaService } from '../../../../shared/database/prisma.service';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { AuthUser } from '../../domain/entities/auth-user.entity';
import { UserRole } from '../../domain/enums/user-role.enum';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<AuthUser | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return this.toDomain(user);
  }

  async findById(id: number): Promise<AuthUser | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return this.toDomain(user);
  }

  async create(
    email: string,
    hashedPassword: string,
    name: string,
    role: string,
  ): Promise<AuthUser> {
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
    });

    return this.toDomain(user);
  }

  async validateCredentials(
    email: string,
    plainPassword: string,
  ): Promise<AuthUser | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    const isPasswordValid = await compare(plainPassword, user.password);

    if (!isPasswordValid) return null;

    return this.toDomain(user);
  }

  private toDomain(prismaUser: any): AuthUser {
    return new AuthUser(
      prismaUser.id,
      prismaUser.email,
      prismaUser.name,
      this.mapRole(prismaUser.role),
    );
  }

  private mapRole(prismaRole: string): UserRole {
    switch (prismaRole) {
      case 'ADMIN':
        return UserRole.ADMIN;
      case 'USER':
      default:
        return UserRole.USER;
    }
  }
}
