import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemEntity } from '../domain/item.entity';

@Injectable()
export class ItemsRepository {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly repo: Repository<ItemEntity>,
  ) {}

  async create(data: Partial<ItemEntity>): Promise<ItemEntity> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findAll(): Promise<ItemEntity[]> {
    return this.repo.find({ order: { id: 'DESC' } });
  }
}
