import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserRole } from '../../../domain/enums/user-role.enum';

@ObjectType()
export class UserOutput {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  role: UserRole;
}
