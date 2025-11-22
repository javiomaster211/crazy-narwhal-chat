import { IUserRepository } from '../../domain/repositories/user.repository.interface';

class RegisterUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(email, password, name) {}
}
