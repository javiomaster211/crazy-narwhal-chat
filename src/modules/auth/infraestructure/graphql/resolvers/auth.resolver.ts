import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { RegisterUseCase } from '../../../application/use-cases/register.use-case';
import { LoginUseCase } from '../../../application/use-cases/login.use-case';
import { RegisterInput } from '../dto/register-input.dto';
import { LoginInput } from '../dto/login-input.dto';
import { AuthResponseOutput } from '../dto/auth-response-ouput.dto';
import { UserOutput } from '../dto/user-output.dto';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Query(() => String)
  hello(): string {
    return 'Hello World!';
  }

  @Mutation(() => UserOutput)
  async register(@Args('input') input: RegisterInput): Promise<UserOutput> {
    const user = await this.registerUseCase.execute({
      email: input.email,
      password: input.password,
      name: input.name,
    });

    if (!user) {
      throw new Error('User registration failed');
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  @Mutation(() => AuthResponseOutput)
  async login(@Args('input') input: LoginInput): Promise<AuthResponseOutput> {
    const result = await this.loginUseCase.execute({
      email: input.email,
      password: input.password,
    });

    return {
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        role: result.user.role,
      },
      accessToken: result.accessToken,
    };
  }
}
