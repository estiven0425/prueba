
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';

import { CuentasService } from './cuentas.service.js';
import { Cuenta } from './models/cuenta.module.js';
import { CreateCuentaDto } from './dto/create-cuenta.dto.js';
import { UpdateCuentaDto } from './dto/update-cuenta.dto.js';

@Controller('cuentas')
export class CuentasController {
  constructor(
    private readonly cuentasService: CuentasService,
  ) {}

  // Obtener todas las cuentas
  @Get()
  findAll(): Promise<Cuenta[]> {
    return this.cuentasService.findAll();
  }

  // Obtener una cuenta por ID
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Cuenta> {
    const cuenta = await this.cuentasService.findOne(id);

    if (!cuenta) {
      throw new NotFoundException('Cuenta no encontrada');
    }

    return cuenta;
  }

  // Crear una cuenta
  @Post()
  create(
    @Body() data: CreateCuentaDto,
  ): Promise<Cuenta> {
    return this.cuentasService.create(data);
  }

  // Actualizar una cuenta
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCuentaDto,
  ): Promise<Cuenta> {
    const affectedRows = await this.cuentasService.update(id, data);

    if (affectedRows === 0) {
      throw new NotFoundException('Cuenta no encontrada');
    }

    const cuenta = await this.cuentasService.findOne(id);

    if (!cuenta) {
      throw new NotFoundException('Cuenta no encontrada');
    }

    return cuenta;
  }

  // Eliminar una cuenta
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    const deletedRows = await this.cuentasService.remove(id);

    if (deletedRows === 0) {
      throw new NotFoundException('Cuenta no encontrada');
    }

    return {
      message: 'Cuenta eliminada correctamente',
    };
  }
}
