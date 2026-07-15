import { Injectable } from '@nestjs/common';
import { CreateItemDto } from '../domain/create-item.dto';
import { ItemsRepository } from '../repository/items.repository';

@Injectable()
export class ItemsService {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  async create(dto: CreateItemDto) {
    return this.itemsRepository.create({ ...dto, status: 'available' });
  }
}
