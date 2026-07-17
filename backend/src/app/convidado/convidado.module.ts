import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConvidadoController } from './controller/convidado.controller';
import { ConvidadoService } from './service/convidado.service';
import { ItemsRepository } from '../items/repository/items.repository';
import { ItemEntity } from '../items/domain/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity])],
  controllers: [ConvidadoController],
  providers: [ConvidadoService, ItemsRepository],
})
export class ConvidadoModule {}
