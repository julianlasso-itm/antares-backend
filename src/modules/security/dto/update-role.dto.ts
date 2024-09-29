import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({
    description: 'Nombre del rol en el sistema',
    example: 'Administrador',
    required: false,
    maxLength: 50,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @ApiProperty({
    description: 'Descripción del rol en el sistema',
    example: 'Rol para administrar el sistema',
    required: false,
    maxLength: 1024,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1024)
  description?: string;

  @ApiProperty({
    description: 'Estado del registro. True activo, False inactivo',
    example: true,
    required: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
