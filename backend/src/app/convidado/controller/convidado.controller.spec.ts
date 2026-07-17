import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ConvidadoController } from './convidado.controller';
import { ConvidadoService } from '../service/convidado.service';

describe('ConvidadoController', () => {
  let app: INestApplication;
  const mockService = { findAll: jest.fn() };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConvidadoController],
      providers: [{ provide: ConvidadoService, useValue: mockService }],
    }).compile();

    app = module.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /api/convidado/items', () => {
    it('deve retornar 200 com lista de itens quando existem registros', async () => {
      const items = [
        { id: 1, name: 'Item 1', image: 'img1' },
        { id: 2, name: 'Item 2', image: 'img2' },
      ];
      mockService.findAll.mockResolvedValue(items);

      const res = await request(app.getHttpServer())
        .get('/api/convidado/items')
        .expect(200);

      expect(res.body).toEqual(items);
      expect(mockService.findAll).toHaveBeenCalled();
    });

    it('deve retornar 200 com array vazio quando não existem registros', async () => {
      mockService.findAll.mockResolvedValue([]);

      const res = await request(app.getHttpServer())
        .get('/api/convidado/items')
        .expect(200);

      expect(res.body).toEqual([]);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });
});
