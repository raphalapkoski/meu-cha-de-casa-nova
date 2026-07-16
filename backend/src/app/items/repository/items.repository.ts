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

  async findOne(id: number): Promise<ItemEntity | null> {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, data: Partial<ItemEntity>): Promise<ItemEntity> {
    await this.repo.update(id, data);
    return this.repo.findOneBy({ id }) as Promise<ItemEntity>;
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
