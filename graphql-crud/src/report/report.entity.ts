import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Report {
  @Field(() => ID)
  id?: string;

  @Field(() => Int)
  temperature: number;

  @Field()
  deviceId: string;
}
