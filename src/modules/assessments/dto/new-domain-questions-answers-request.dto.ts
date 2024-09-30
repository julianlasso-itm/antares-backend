import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateIf,
} from 'class-validator';

export class NewDomainQuestionsAnswersRequestDto {
  @ApiProperty({
    description: 'Identificador del dominio de conocimiento',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: false,
    maxLength: 26,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(26)
  @ValidateIf((object) => object.domainKnowledgeLevelId === null)
  domainKnowledgeId?: string;

  @ApiProperty({
    description: 'Identificador del nivel del dominio de conocimiento',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: false,
    maxLength: 26,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(26)
  @ValidateIf((object) => object.domainKnowledgeId === null)
  domainKnowledgeLevelId?: string;

  @ApiProperty({
    description: 'Pregunta a realizar bajo un dominio de conocimiento',
    example: '¿Cuál es el mejor lenguaje de programación?',
    required: true,
    maxLength: 500,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  question: string;

  @ApiProperty({
    description:
      'Respuesta a la pregunta. La respuesta del profesional no debe ser exacta',
    example: 'Sin duda alguna PHP es el mejor lenguaje de programación',
    required: true,
    maxLength: 8192,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(8192)
  answer: string;
}
