import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { ItemsController } from './items.controller';
import { ItemsService } from '../service/items.service';

describe('ItemsController', () => {
  let app: INestApplication;
  const mockService = { create: jest.fn(), findAll: jest.fn(), update: jest.fn() };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [{ provide: ItemsService, useValue: mockService }],
    }).compile();

    app = module.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /api/items', () => {
    it('1.1 GET com lista cheia retorna 200 e array de itens', async () => {
      const items = [
        { id: 1, name: 'Item 1', image: 'img1', status: 'available' },
        { id: 2, name: 'Item 2', image: 'img2', status: 'available' },
      ];
      mockService.findAll.mockResolvedValue(items);

      const res = await request(app.getHttpServer())
        .get('/api/items')
        .expect(200);

      expect(res.body).toEqual(items);
      expect(mockService.findAll).toHaveBeenCalled();
    });

    it('1.2 GET com lista vazia retorna 200 e array vazio', async () => {
      mockService.findAll.mockResolvedValue([]);

      const res = await request(app.getHttpServer())
        .get('/api/items')
        .expect(200);

      expect(res.body).toEqual([]);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('PUT /api/items/:id', () => {
    const validPayload = {
      name: 'Item Atualizado',
      image: 'data:image/png;base64,iVBORw0KGgo=',
    };

    const updatedItem = {
      id: 1,
      ...validPayload,
      status: 'available',
    };

    it('PUT com dados válidos retorna 200', async () => {
      mockService.update.mockResolvedValue(updatedItem);

      const res = await request(app.getHttpServer())
        .put('/api/items/1')
        .send(validPayload)
        .expect(200);

      expect(res.body).toEqual(updatedItem);
      expect(mockService.update).toHaveBeenCalledWith(1, validPayload);
    });

    it('PUT sem name retorna 400', async () => {
      const { name, ...payload } = validPayload;

      const res = await request(app.getHttpServer())
        .put('/api/items/1')
        .send(payload)
        .expect(400);

      expect(res.body.message).toEqual(
        expect.arrayContaining([expect.stringMatching(/name/i)]),
      );
      expect(mockService.update).not.toHaveBeenCalled();
    });

    it('PUT com name vazio retorna 400', async () => {
      const res = await request(app.getHttpServer())
        .put('/api/items/1')
        .send({ ...validPayload, name: '' })
        .expect(400);

      expect(res.body.message).toEqual(
        expect.arrayContaining([expect.stringMatching(/name/i)]),
      );
      expect(mockService.update).not.toHaveBeenCalled();
    });

    it('PUT com name > 255 chars retorna 400', async () => {
      const res = await request(app.getHttpServer())
        .put('/api/items/1')
        .send({ ...validPayload, name: 'a'.repeat(256) })
        .expect(400);

      expect(res.body.message).toEqual(
        expect.arrayContaining([expect.stringMatching(/name/i)]),
      );
      expect(mockService.update).not.toHaveBeenCalled();
    });

    it('PUT com id não numérico retorna 400', async () => {
      const res = await request(app.getHttpServer())
        .put('/api/items/abc')
        .send(validPayload)
        .expect(400);

      expect(mockService.update).not.toHaveBeenCalled();
    });

    it('PUT com campo extra retorna 400', async () => {
      const res = await request(app.getHttpServer())
        .put('/api/items/1')
        .send({ ...validPayload, extraField: 'should not be allowed' })
        .expect(400);

      expect(res.body.message).toEqual(
        expect.arrayContaining([expect.stringMatching(/extraField/i)]),
      );
      expect(mockService.update).not.toHaveBeenCalled();
    });
  });

  describe('POST /api/items', () => {
    const validPayload = {
      name: 'Item Teste',
      image: 'data:image/png;base64,iVBORw0KGgo=',
    };

    const expectedItem = {
      id: 1,
      ...validPayload,
      status: 'available',
    };

    it('5.1 POST com dados válidos retorna 201', async () => {
      mockService.create.mockResolvedValue(expectedItem);

      const res = await request(app.getHttpServer())
        .post('/api/items')
        .send(validPayload)
        .expect(201);

      expect(res.body).toEqual(expectedItem);
      expect(mockService.create).toHaveBeenCalledWith(validPayload);
    });

    it('5.2 POST sem name retorna 400', async () => {
      const { name, ...payload } = validPayload;

      const res = await request(app.getHttpServer())
        .post('/api/items')
        .send(payload)
        .expect(400);

      expect(res.body.message).toEqual(
        expect.arrayContaining([expect.stringMatching(/name/i)]),
      );
      expect(mockService.create).not.toHaveBeenCalled();
    });

    it('5.3 POST com name vazio retorna 400', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/items')
        .send({ ...validPayload, name: '' })
        .expect(400);

      expect(res.body.message).toEqual(
        expect.arrayContaining([expect.stringMatching(/name/i)]),
      );
      expect(mockService.create).not.toHaveBeenCalled();
    });

    it('5.4 POST com name > 255 chars retorna 400', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/items')
        .send({ ...validPayload, name: 'a'.repeat(256) })
        .expect(400);

      expect(res.body.message).toEqual(
        expect.arrayContaining([expect.stringMatching(/name/i)]),
      );
      expect(mockService.create).not.toHaveBeenCalled();
    });

    it('5.5 POST com status no body retorna 400', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/items')
        .send({ ...validPayload, status: 'unavailable' })
        .expect(400);

      expect(res.body.message).toEqual(
        expect.arrayContaining([expect.stringMatching(/status/i)]),
      );
      expect(mockService.create).not.toHaveBeenCalled();
    });

    it('5.6 POST com campo extra retorna 400', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/items')
        .send({ ...validPayload, extraField: 'should not be allowed' })
        .expect(400);

      expect(res.body.message).toEqual(
        expect.arrayContaining([expect.stringMatching(/extraField/i)]),
      );
      expect(mockService.create).not.toHaveBeenCalled();
    });
  });
});
