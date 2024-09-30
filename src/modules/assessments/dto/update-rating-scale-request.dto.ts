import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateRatingScaleRequestDto {
  @ApiProperty({
    description: 'Identificador de la configuración del sistema',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    examples: ['01J8XM2FC49N58RTHH671GPFVV', null],
    required: false,
    maxLength: 26,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(26)
  configurationLevelId?: string;

  @ApiProperty({
    description: 'Nombre de la escala a usar',
    example: 'No conoce',
    examples: ['No conoce', 'Conoce', 'Comprende', 'Practica', null],
    required: false,
    maxLength: 80,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  name?: string;

  @ApiProperty({
    description: 'Descripción de la escala',
    example: 'No maneja los conceptos básicos',
    examples: ['No maneja los conceptos básicos', null],
    required: false,
    maxLength: 500,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty({
    description: 'Valor de la escala. Acepta hasta dos decimales.',
    example: 5.0,
    examples: [0.0, 1.0, 2.0, 2.5, 3.0, 4.0, 5.0, null],
    maximum: 5.0,
    minimum: 0.0,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  value?: number;

  @ApiProperty({
    description: 'Posición de la escala. Sólo números enteros',
    example: 1,
    examples: [1, 2, 3, null],
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  position?: number;

  @ApiProperty({
    description: 'Estado del registro. True activo, False inactivo',
    example: true,
    examples: [true, false, null],
    required: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
