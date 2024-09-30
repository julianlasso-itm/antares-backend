import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewKnowledgeGapRequestDto {
  @ApiProperty({
    description: 'Identificador del ensayo de conocimiento',
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
    description: 'Identificador del dominio de conocimiento en una tecnología',
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
    description: 'Observaciones sobre la brecha de conocimiento detectada',
    example:
      'Posee los conocimientos teóricos necesarios, pero aún falla en la práctica.',
    required: true,
    maxLength: 8192,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(8192)
  observation: string;
}
