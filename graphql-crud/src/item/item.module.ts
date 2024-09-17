import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema } from './item.schema';
import { ItemService } from './item.service';
import { ItemResolver } from './item.resolver';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }])],
  providers: [ItemService, ItemResolver],
})
export class ItemModule {}
