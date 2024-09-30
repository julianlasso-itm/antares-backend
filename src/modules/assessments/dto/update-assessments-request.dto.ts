import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateAssessmentsRequestDto {
  @ApiProperty({
    description: 'Observaciones del evaluador sobre el dominio de conocimiento',
    example: 'Observaciones del dominio de conocimiento al ser evaluado',
    required: false,
    maxLength: 8192,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(8192)
  observations?: string;

  @ApiProperty({
    description:
      'Puntaje total del dominio de conocimiento. Acepta hasta dos decimales',
    example: 5.0,
    examples: [0.0, 1.0, 5.0, null],
    minimum: 0.0,
    maximum: 5.0,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  score?: number;

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
