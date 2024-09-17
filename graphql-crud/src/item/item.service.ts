import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './item.entity';
import { CreateItemInput, UpdateItemInput } from './item.input';

@Injectable()
export class ItemService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

  async create(createItemInput: CreateItemInput): Promise<Item> {
    const createdItem = new this.itemModel(createItemInput);
    return createdItem.save();
  }

  async findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async findOne(id: string): Promise<Item> {
    return this.itemModel.findById(id).exec();
  }

  async update(updateItemInput: UpdateItemInput): Promise<Item> {
    return this.itemModel.findByIdAndUpdate(updateItemInput.id, updateItemInput, { new: true }).exec();
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.itemModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}
