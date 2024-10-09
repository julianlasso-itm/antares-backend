import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateLevelRequestDto {
  @ApiProperty({
    description: 'Nombre del nivel en el sistema',
    example: 'Junior',
    examples: ['Junior', 'Middle', 'Senior', null],
    required: false,
    maxLength: 30,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  name?: string;

  @ApiProperty({
    description: 'Peso (importancia) del nivel. Acepta hasta dos decimales',
    example: 0.8,
    examples: [0.0, 0.5, 1.0, null],
    minimum: 0.0,
    maximum: 1.0,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  weight?: number;

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
