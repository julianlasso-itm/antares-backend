import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTechnologyTypeDto {
  @ApiProperty({
    description: 'Nombre del tipo de tecnología',
    example: 'Lenguaje de programación',
    required: false,
    maxLength: 500,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  name?: string;

  @ApiProperty({
    description: 'Descripción del tipo de tecnología',
    example: 'Lenguaje de programación para el desarrollo de aplicaciones',
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
    required: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
