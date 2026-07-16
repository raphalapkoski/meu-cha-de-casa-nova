import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { ItemsRepository } from '../repository/items.repository';

describe('ItemsService', () => {
  let service: ItemsService;
  const mockRepository = { create: jest.fn(), findAll: jest.fn() };

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

  describe('findAll', () => {
    it('deve retornar lista de itens quando existem registros', async () => {
      const items = [
        { id: 1, name: 'Item 1', description: 'Desc 1', image: 'img1', status: 'available' },
        { id: 2, name: 'Item 2', description: 'Desc 2', image: 'img2', status: 'available' },
      ];
      mockRepository.findAll.mockResolvedValue(items);

      const result = await service.findAll();

      expect(mockRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(items);
    });

    it('deve retornar array vazio quando não existem registros', async () => {
      mockRepository.findAll.mockResolvedValue([]);

      const result = await service.findAll();

      expect(mockRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
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
