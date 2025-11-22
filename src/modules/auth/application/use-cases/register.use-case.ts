import { ConflictException, Injectable } from '@nestjs/common';
import { AuthUser } from '../../domain/entities/auth-user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { RegisterDto } from '../dto/register.dto';
import bcrypt from 'bcrypt';
import { UserRole } from '../../domain/enums/user-role.enum';

@Injectable()
export class RegisterUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(dto: RegisterDto): Promise<AuthUser | null> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userRepository.create(
      dto.email,
      hashedPassword,
      dto.name,
      UserRole.USER,
    );

    return user;
  }
}
