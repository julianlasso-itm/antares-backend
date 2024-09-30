import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateRolePerProfessionalDto {
  @ApiProperty({
    description:
      'Identificador del rol o posición de un profesional en un proyecto de un cliente',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    examples: ['01J8XM2FC49N58RTHH671GPFVV', null],
    required: false,
    maxLength: 26,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(26)
  roleId?: string;

  @ApiProperty({
    description: 'Identificador del profesional en el sistema',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    examples: ['01J8XM2FC49N58RTHH671GPFVV', null],
    required: false,
    maxLength: 26,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(26)
  professionalId?: string;

  @ApiProperty({
    description:
      'Fecha y hora en que el profesional entra a participar en un proyecto de un cliente con un rol específico',
    example: '2023-03-30T12:00:00.000Z',
    examples: ['2023-03-30T12:00:00.000Z', null],
    required: false,
    type: Date,
  })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  startDate?: Date;

  @ApiProperty({
    description:
      'Fecha y hora en que el profesional deja de participar en un proyecto de un cliente con un rol específico',
    example: '2023-03-30T12:00:00.000Z',
    examples: ['2023-03-30T12:00:00.000Z', null],
    required: false,
    type: Date,
  })
  @IsOptional()
  @IsString()
  @MaxLength(30)
  endDate?: Date;

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
