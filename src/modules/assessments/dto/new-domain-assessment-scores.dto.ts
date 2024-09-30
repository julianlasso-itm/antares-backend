import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class NewDomainAssessmentScoresDto {
  @ApiProperty({
    description: 'Identificador del puntaje del dominio de conocimiento',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  assessmentId: string;

  @ApiProperty({
    description: 'Identificador del dominio de conocimiento',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  domainKnowledgeId: string;

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
    description: 'Observaciones del evaluador sobre el dominio de conocimiento',
    example: 'Observaciones del dominio de conocimiento al ser evaluado',
    required: false,
    maxLength: 8192,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(8192)
  observations: string | null;

  @ApiProperty({
    description:
      'Puntaje del dominio del conocimiento al ser evaluado. Acepta hasta dos decimales',
    example: 5.0,
    examples: [0.0, 1.0, 2.0, 2.5, 3.0, 4.0, 5.0],
    maximum: 5.0,
    minimum: 0.0,
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  score: number;
}
