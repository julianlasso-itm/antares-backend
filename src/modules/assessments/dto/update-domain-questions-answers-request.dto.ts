import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateDomainQuestionsAnswersRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(26)
  domainKnowledgeId?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(26)
  domainKnowledgeLevelId?: string | null;

  @ApiProperty({
    description: 'Pregunta a realizar bajo un dominio de conocimiento',
    example: '¿Cuál es el lenguaje de programación más popular?',
    examples: ['¿Cuál es el lenguaje de programación más popular?', null],
    required: false,
    maxLength: 500,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  question?: string;

  @ApiProperty({
    description: 'Respuesta a la pregunta',
    example: 'Sin duda, PHP es un lenguaje de programación más popular',
    examples: [
      'Sin duda, PHP es un lenguaje de programación más popular',
      null,
    ],
    required: false,
    maxLength: 8192,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(8192)
  answer?: string;

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
