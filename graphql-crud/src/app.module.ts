import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemModule } from './item/item.module';
import { ItemSchema } from './item/item.schema';
import { ReportModule } from './report/report.module';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      csrfPrevention: false, 
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    ItemModule,
    ReportModule,
  ],
})
export class AppModule {}
