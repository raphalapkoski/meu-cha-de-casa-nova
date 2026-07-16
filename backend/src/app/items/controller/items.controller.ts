import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ItemsService } from '../service/items.service';
import { CreateItemDto } from '../domain/create-item.dto';
import { UpdateItemDto } from '../domain/update-item.dto';

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

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateItemDto) {
    return this.itemsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.remove(id);
  }
}
