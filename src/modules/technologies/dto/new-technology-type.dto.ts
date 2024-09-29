import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewTechnologyTypeDto {
  @ApiProperty({
    description: 'Nombre del tipo de tecnología',
    example: 'Lenguaje de programación',
    required: true,
    maxLength: 500,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  name: string;

  @ApiProperty({
    description: 'Descripción del tipo de tecnología',
    example: 'Lenguaje de programación para el desarrollo de aplicaciones',
    required: false,
    maxLength: 2048,
    type: String,
  })
  @IsString()
  @MaxLength(2048)
  description?: string;
}
