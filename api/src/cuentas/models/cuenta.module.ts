import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';

@Table({
  tableName: 'cuentas',
  timestamps: false,
})
export class Cuenta extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare codigo: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare nombre: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare nivel: number;

  @ForeignKey(() => Cuenta)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  })
  declare padre: number | null;

  @BelongsTo(() => Cuenta, 'padre')
  declare cuentaPadre: Cuenta;

  @HasMany(() => Cuenta, 'padre')
  declare cuentasHijas: Cuenta[];

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare naturaleza: string;
}