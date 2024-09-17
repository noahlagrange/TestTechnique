import { Schema, Document } from 'mongoose';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Report extends Document {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  temperature: number;

  @Field()
  deviceId: string;
}

export const ReportSchema = new Schema({
  temperature: { type: Number, required: true },
  deviceId: { type: String, required: true },
});
