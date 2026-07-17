import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateItemDto } from '../domain/create-item.dto';
import { UpdateItemDto } from '../domain/update-item.dto';
import { ItemsRepository } from '../repository/items.repository';

@Injectable()
export class ItemsService {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  async create(dto: CreateItemDto) {
    return this.itemsRepository.create({ ...dto, status: 'available' });
  }

  async findAll() {
    return this.itemsRepository.findAll();
  }

  async update(id: number, dto: UpdateItemDto) {
    const item = await this.itemsRepository.findOne(id);
    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return this.itemsRepository.update(id, { ...dto });
  }

  async marcarCompra(id: number) {
    const item = await this.itemsRepository.findOne(id);
    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    if (item.status === 'unavailable') {
      throw new BadRequestException(`Item with id ${id} is already marked as purchased`);
    }
    return this.itemsRepository.updateStatus(id, 'unavailable');
  }

  async remove(id: number) {
    const item = await this.itemsRepository.findOne(id);
    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return this.itemsRepository.remove(id);
  }
}
