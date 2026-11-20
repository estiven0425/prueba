import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateCuentaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(6)
  @Matches(/^[0-9]+$/, {
    message: 'El código debe contener únicamente números',
  })
  codigo: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsOptional()
  @IsInt()
  padre?: number | null;

  @IsString()
  @IsNotEmpty()
  naturaleza: string;
}