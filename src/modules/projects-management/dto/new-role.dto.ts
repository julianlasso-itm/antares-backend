import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class NewRoleDto {
  @ApiProperty({
    description:
      'Nombre del rol para los profesionales en un proyecto de un cliente',
    example: 'Backend Developer',
    required: true,
    maxLength: 50,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description:
      'Descripción del rol para los profesionales en un proyecto de un cliente',
    example: 'Rol para desarrollar aplicaciones backend',
    required: false,
    maxLength: 2048,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  description?: string;

  @ApiProperty({
    description: 'Identificador del sub-rol que compone un rol en el sistema',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: false,
    maxLength: 26,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(26)
  subRoleId?: string;
}
