import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ItemsService } from '../service/items.service';
import { CreateItemDto } from '../domain/create-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateItemDto) {
    return this.itemsService.create(dto);
  }
}
