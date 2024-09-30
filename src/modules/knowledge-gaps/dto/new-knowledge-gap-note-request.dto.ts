import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewKnowledgeGapNoteRequestDto {
  @ApiProperty({
    description: 'Identificador de la brecha de conocimiento detectada',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  knowledgeGapId: string;

  @ApiProperty({
    description:
      'Identificador del usuario en el sistema que realizó la nota sobre la brecha de conocimiento detectada',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  userId: string;

  @ApiProperty({
    description: 'Nota sobre la brecha de conocimiento detectada',
    example: 'Está evolucionando a buen ritmo, aún falta trabajo por hacer.',
    required: true,
    maxLength: 8192,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(8192)
  note: string;
}
