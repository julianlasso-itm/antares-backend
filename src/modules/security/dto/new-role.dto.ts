import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewRoleDto {
  @ApiProperty({
    description: 'Nombre del rol en el sistema',
    example: 'Administrador',
    required: true,
    maxLength: 50,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'Descripción del rol en el sistema',
    example: 'Rol para administrar el sistema',
    required: false,
    maxLength: 1024,
    type: String,
  })
  @IsString()
  @MaxLength(1024)
  description: string;
}
