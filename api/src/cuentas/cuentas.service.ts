import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';
import { Cuenta } from './models/cuenta.module.js';
import { CreateCuentaDto } from './dto/create-cuenta.dto.js';
import { UpdateCuentaDto } from './dto/update-cuenta.dto.js';

@Injectable()
export class CuentasService {
  constructor(
    @InjectModel(Cuenta)
    private cuentaModel: typeof Cuenta,
  ) {}

  // Obtener todas las cuentas
  async findAll(): Promise<Cuenta[]> {
    return this.cuentaModel.findAll();
  }

  // Obtener una cuenta por ID
  async findOne(id: number): Promise<Cuenta | null> {
    return this.cuentaModel.findByPk(id);
  }

  // Calcular nivel según longitud del código
  private calcularNivel(codigo: string): number {
    const niveles: Record<number, number> = {
      1: 1,
      2: 2,
      4: 3,
      6: 4,
    };

    const nivel = niveles[codigo.length];

    if (!nivel) {
      throw new BadRequestException(
        'El código debe tener 1, 2, 4 o 6 dígitos',
      );
    }

    return nivel;
  }

  // Crear una cuenta
  async create(data: CreateCuentaDto): Promise<Cuenta> {
    return this.cuentaModel.create({
      ...data,
      nivel: this.calcularNivel(data.codigo),
    });
  }

  // Actualizar una cuenta
    async update(
    id: number,
    data: UpdateCuentaDto,
    ): Promise<number> {
    const payload: Partial<Cuenta> = { ...data };

    if (data.codigo !== undefined) {
        payload.nivel = this.calcularNivel(data.codigo);
    }

    const [affectedCount] = await this.cuentaModel.update(payload, {
        where: { id },
    });

    return affectedCount;
    }

  // Eliminar una cuenta
  async remove(id: number): Promise<number> {
    return this.cuentaModel.destroy({
      where: { id },
    });
  }
}
