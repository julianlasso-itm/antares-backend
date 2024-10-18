import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class NewDomainKnowledgeDto {
  @ApiProperty({
    description: 'Identificador de la tecnología',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9a-zA-Z]{26}$/, {
    message: 'NewDomainKnowledgeDto',
  })
  @MaxLength(26)
  technologyItemId: string;

  @ApiProperty({
    description: 'Dominio de conocimiento',
    example: 'Programación Reactiva',
    required: true,
    maxLength: 500,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  domain: string;

  @ApiProperty({
    description:
      'Comentario para guiar al experto en el dominio de conocimiento',
    example: 'Programación Reactiva con WebFlux',
    required: false,
    maxLength: 1024,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1024)
  topic?: string;

  @ApiProperty({
    description:
      'Peso del dominio del conocimiento, acepta hasta dos decimales',
    example: 0.8,
    examples: [0.0, 0.5, 1.0],
    maximum: 1.0,
    minimum: 0.0,
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  weight?: number;
}
