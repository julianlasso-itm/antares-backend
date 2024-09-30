import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class NewRatingScaleRequestDto {
  @ApiProperty({
    description: 'Identificador de la configuración usada',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  configurationLevelId: string;

  @ApiProperty({
    description: 'Nombre de la escala a usar',
    example: 'No conoce',
    examples: [
      'No conoce',
      'Conoce',
      'Comprende',
      'Practica',
      'Domina',
      'Experto',
    ],
    required: true,
    maxLength: 80,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  name: string;

  @ApiProperty({
    description: 'Descripción de la escala',
    example: 'No conoce sobre el tema',
    required: true,
    maxLength: 500,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;

  @ApiProperty({
    description: 'Valor de la escala. Acepta hasta dos decimales.',
    example: 5.0,
    examples: [0.0, 1.0, 2.0, 2.5, 3.0, 4.0, 5.0],
    maximum: 5.0,
    minimum: 0.0,
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @ApiProperty({
    description: 'Posición de la escala. Sólo números enteros',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  position: number;
}
