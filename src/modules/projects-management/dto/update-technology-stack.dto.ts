import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTechnologyStackDto {
  @ApiProperty({
    description: 'Identificador del proyecto de un cliente',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    examples: ['01J8XM2FC49N58RTHH671GPFVV', null],
    required: false,
    maxLength: 26,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(26)
  projectId?: string;

  @ApiProperty({
    description: 'Identificador de una tecnología',
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
