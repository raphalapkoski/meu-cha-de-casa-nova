import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { ItemsRepository } from '../repository/items.repository';

describe('ItemsService', () => {
  let service: ItemsService;
  const mockRepository = { create: jest.fn() };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        { provide: ItemsRepository, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const dto = {
      name: 'Item Teste',
      description: 'Descrição do item',
      image: 'data:image/png;base64,iVBORw0KGgo=',
    };

    it('deve criar um item com status available', async () => {
      const savedEntity = { id: 1, ...dto, status: 'available' };
      mockRepository.create.mockResolvedValue(savedEntity);

      const result = await service.create(dto);

      expect(mockRepository.create).toHaveBeenCalledWith({
        ...dto,
        status: 'available',
      });
      expect(result).toEqual(savedEntity);
    });
  });
});
