import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewProjectDto {
  @ApiProperty({
    description: 'Nombre del proyecto de un cliente',
    example: 'Proyecto ANTARES',
    required: true,
    maxLength: 500,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  name: string;

  @ApiProperty({
    description: 'Descripción del proyecto de un cliente',
    example:
      'Aplicación para evaluar las tecnologías usadas por los profesionales',
    required: false,
    maxLength: 2048,
    type: String,
  })
  @IsString()
  @MaxLength(2048)
  description?: string;

  @ApiProperty({
    description: 'Identificador del cliente',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @IsString()
  @MaxLength(26)
  customerId: string;
}
