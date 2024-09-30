import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateConfigurationPerLevelRequestDto {
  @ApiProperty({
    description: 'Identificador del nivel en el sistema',
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
    description: 'Identificador del nivel en el sistema. Ejemplo: Junior',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    examples: ['01J8XM2FC49N58RTHH671GPFVV', null],
    required: false,
    maxLength: 26,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(26)
  levelId?: string;

  @ApiProperty({
    description: 'Posición del nivel en el sistema. Usar números enteros',
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
