import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateDomainKnowledgeDto {
  @ApiProperty({
    description: 'Identificador de la tecnología',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    examples: ['01J8XM2FC49N58RTHH671GPFVV', null],
    required: false,
    maxLength: 26,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(26)
  technologyItemId?: string;

  @ApiProperty({
    description: 'Dominio de conocimiento',
    example: 'Programación Reactiva',
    examples: ['Programación Reactiva', null],
    required: false,
    maxLength: 500,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  domain?: string;

  @ApiProperty({
    description:
      'Comentario para guiar al experto en el dominio de conocimiento',
    example: 'Programación Reactiva con WebFlux',
    examples: ['Programación Reactiva con WebFlux', null],
    required: false,
    maxLength: 1024,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1024)
  topic?: string;

  @ApiProperty({
    description: 'Peso del dominio de conocimiento',
    example: 1.0,
    examples: [0.0, 1.0, null],
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
