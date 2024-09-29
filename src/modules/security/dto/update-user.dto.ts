import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Nombre del usuario en el sistema',
    example: 'Julian Andres Lasso Figueroa',
    required: false,
    maxLength: 500,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario en el sistema',
    example: 'julian.lasso@sofka.com.co',
    required: false,
    maxLength: 500,
    type: String,
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;

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
