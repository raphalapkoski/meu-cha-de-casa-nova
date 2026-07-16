import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ItemsService } from '../service/items.service';
import { CreateItemDto } from '../domain/create-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.itemsService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateItemDto) {
    return this.itemsService.create(dto);
  }
}
