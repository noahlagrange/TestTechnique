import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ItemService } from './item.service';
import { Item } from './item.entity';
import { CreateItemInput, UpdateItemInput } from './item.input';

@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @Mutation(() => Item)
  async createItem(@Args('createItemInput') createItemInput: CreateItemInput): Promise<Item> {
    return this.itemService.create(createItemInput);
  }

  @Query(() => [Item])
  async items(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Query(() => Item, { nullable: true })
  async item(@Args('id') id: string): Promise<Item> {
    return this.itemService.findOne(id);
  }

  @Mutation(() => Item)
  async updateItem(@Args('updateItemInput') updateItemInput: UpdateItemInput): Promise<Item> {
    return this.itemService.update(updateItemInput);
  }

  @Mutation(() => Boolean)
  async removeItem(@Args('id') id: string): Promise<boolean> {
    return this.itemService.remove(id);
  }
}
