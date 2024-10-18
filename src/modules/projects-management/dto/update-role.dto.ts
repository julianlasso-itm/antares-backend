import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({
    description:
      'Nombre del rol para los profesionales en un proyecto de un cliente',
    example: 'Backend Developer',
    examples: ['Backend Developer', null],
    required: false,
    maxLength: 50,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiProperty({
    description:
      'Descripción del rol para los profesionales en un proyecto de un cliente',
    example: 'Rol para desarrollar aplicaciones backend',
    examples: ['Rol para desarrollar aplicaciones backend', null],
    required: false,
    maxLength: 2048,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  description?: string;

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
