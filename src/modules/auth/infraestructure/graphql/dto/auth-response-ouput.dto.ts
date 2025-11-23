import { ObjectType, Field } from '@nestjs/graphql';
import { UserOutput } from './user-output.dto';

@ObjectType()
export class AuthResponseOutput {
  @Field(() => UserOutput)
  user: UserOutput;

  @Field()
  accessToken: string;
}
