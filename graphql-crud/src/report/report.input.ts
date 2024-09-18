import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { DateTimeResolver } from 'graphql-scalars'; // Import the DateTime scalar

@InputType()
export class CreateReportInput {
  @Field(() => Int)
  temperature: number;

  @Field()
  deviceId: string;

  @Field(() => DateTimeResolver)
  date: Date;
}

@InputType()
export class UpdateReportInput {
  @Field(() => ID)
  id: string;

  @Field(() => Int, { nullable: true })
  temperature?: number;

  @Field({ nullable: true })
  deviceId?: string;

  @Field(() => DateTimeResolver, { nullable: true })
  date?: Date;
}
