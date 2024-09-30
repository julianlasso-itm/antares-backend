import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateKnowledgeGapNoteRequestDto {
  @ApiProperty({
    description: 'Nota sobre la brecha de conocimiento detectada',
    example: 'Está evolucionando a buen ritmo, aún falta trabajo por hacer.',
    examples: [
      'Está evolucionando a buen ritmo, aún falta trabajo por hacer.',
      null,
    ],
    required: false,
    maxLength: 8192,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(8192)
  note?: string;
}
