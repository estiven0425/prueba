import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cuenta } from './models/cuenta.module.js';
import { CuentasService } from './cuentas.service.js';
import { CuentasController } from './cuentas.controller.js';

@Module({
  imports: [
    SequelizeModule.forFeature([Cuenta]),
  ],
  providers: [CuentasService],
  exports: [CuentasService],
  controllers: [CuentasController],
})
export class CuentasModule {}