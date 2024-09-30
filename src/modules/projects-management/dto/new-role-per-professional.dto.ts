import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewRolePerProfessionalDto {
  @ApiProperty({
    description:
      'Identificador del rol o posición de un profesional en un proyecto de un cliente',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  roleId: string;

  @ApiProperty({
    description: 'Identificador del profesional en el sistema',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  professionalId: string;

  @ApiProperty({
    description:
      'Fecha y hora en que el profesional entra a participar en un proyecto de un cliente con un rol específico',
    example: '2023-03-30T12:00:00.000Z',
    required: true,
    type: Date,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  startDate: Date;
}
