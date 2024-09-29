import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTechnologyItemDto {
  @ApiProperty({
    description: 'Identificador del tipo de tecnología',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: false,
    maxLength: 26,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(26)
  technologyTypeId: string;

  @ApiProperty({
    description: 'Nombre de la tecnología',
    example: 'TypeScript',
    required: false,
    maxLength: 500,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  name?: string;

  @ApiProperty({
    description: 'Descripción de la tecnología',
    example: 'Lenguaje de programación de código abierto',
    required: false,
    maxLength: 2048,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  description?: string;

  @ApiProperty({
    description: 'Ícono de la tecnología',
    example: '/icons/100860/react_icon.png',
    required: false,
    maxLength: 500,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  icon?: string;

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
