import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class NewTechnologyItemDto {
  @ApiProperty({
    description: 'Nombre de la tecnología',
    example: 'TypeScript',
    required: true,
    maxLength: 500,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  name: string;

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
  description?: string | null;

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
  icon?: string | null;

  @ApiProperty({
    description: 'Identificador del tipo de tecnología',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  technologyTypeId: string;
}
