import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProjectDto {
  @ApiProperty({
    description: 'Nombre del proyecto de un cliente',
    example: 'Proyecto ANTARES',
    examples: ['Proyecto ANTARES', null],
    required: false,
    maxLength: 500,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  name?: string;

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
