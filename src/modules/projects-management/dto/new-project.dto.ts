import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewProjectDto {
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
}
