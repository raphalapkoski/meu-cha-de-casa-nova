import { Injectable } from '@nestjs/common';
import { IGuestItem } from '@meu-cha-de-casa-nova/shared-types';
import { ItemsRepository } from '../../items/repository/items.repository';

@Injectable()
export class ConvidadoService {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  async findAll(): Promise<IGuestItem[]> {
    const items = await this.itemsRepository.findAll();
    return items.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image,
      status: item.status
    }));
  }
}
