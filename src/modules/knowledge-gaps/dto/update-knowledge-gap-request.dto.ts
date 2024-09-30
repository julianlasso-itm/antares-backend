import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateKnowledgeGapRequestDto {
  @ApiProperty({
    description: 'Observaciones sobre la brecha de conocimiento detectada',
    example:
      'Posee los conocimientos teóricos necesarios, pero aún falla en la práctica.',
    examples: [
      'Posee los conocimientos teóricos necesarios, pero aún falla en la práctica.',
      null,
    ],
    required: false,
    maxLength: 8192,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(8192)
  observation?: string;

  @ApiProperty({
    description: 'Estado del registro. True activo, False inactivo',
    example: true,
    examples: [true, false],
    required: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
