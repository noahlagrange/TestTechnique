import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './item.entity';
import { CreateItemInput, UpdateItemInput } from './item.input';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async create(@Body() createItemInput: CreateItemInput): Promise<Item> {
    return this.itemService.create(createItemInput);
  }

  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Item> {
    return this.itemService.findOne(id);
  }

  @Put()
  async update(@Body() updateItemInput: UpdateItemInput): Promise<Item> {
    return this.itemService.update(updateItemInput);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return this.itemService.remove(id);
  }
}
