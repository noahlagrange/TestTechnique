import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Document } from 'mongoose';
import { DateTimeResolver } from 'graphql-scalars'; 
import { Schema } from 'mongoose';


@ObjectType()
export class Report extends Document {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  temperature: number;

  @Field()
  deviceId: string;

  @Field(() => DateTimeResolver) 
  date: Date;
}
export const ReportSchema = new Schema({
  temperature: { type: Number, required: true },
  deviceId: { type: String, required: true },
  date: { type: Date, required: true }
});

