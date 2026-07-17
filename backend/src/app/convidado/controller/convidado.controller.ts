import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { IGuestItem } from '@meu-cha-de-casa-nova/shared-types';
import { ConvidadoService } from '../service/convidado.service';

@Controller('convidado')
export class ConvidadoController {
  constructor(private readonly convidadoService: ConvidadoService) {}

  @Get('items')
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<IGuestItem[]> {
    return this.convidadoService.findAll();
  }
}
