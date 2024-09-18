import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { DateTimeResolver } from 'graphql-scalars';

@ObjectType()
export class Report {
  @Field(() => ID)
  id?: string;

  @Field(() => Int)
  temperature: number;

  @Field()
  deviceId: string;

  @Field(() => DateTimeResolver)
  date: Date;
}