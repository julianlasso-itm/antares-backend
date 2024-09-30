import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateProfessionalsRequestDto {
  @ApiProperty({
    description: 'Nombre del profesional',
    example: 'Julian Andres Lasso Figueroa',
    examples: ['Julian Lasso', null],
    required: false,
    maxLength: 500,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  name?: string;

  @ApiProperty({
    description: 'Correo electrónico del profesional',
    example: 'julian.lasso@sofka.com.co',
    examples: ['julian.lasso@sofka.com.co', null],
    required: false,
    maxLength: 500,
    type: String,
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  @MaxLength(500)
  email?: string;

  @ApiProperty({
    description: 'Foto del profesional',
    example: '/icons/100860/photo.png',
    examples: ['/icons/100860/photo.png', null],
    required: false,
    maxLength: 1024,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1024)
  photo?: string;

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
