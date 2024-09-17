import { InputType, Field, ID, Int } from '@nestjs/graphql';

@InputType()
export class CreateReportInput {
  @Field(() => Int)
  temperature: number;

  @Field()
  deviceId: string;
}

@InputType()
export class UpdateReportInput {
  @Field(() => ID)
  id: string;

  @Field(() => Int, { nullable: true })
  temperature?: number;

  @Field({ nullable: true })
  deviceId?: string;
}
