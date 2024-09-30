import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewTechnologyPerRoleDto {
  @ApiProperty({
    description:
      'Identificador del rol al que pertenece una tecnología en un stack tecnológico de un proyecto de un cliente',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  roleId: string;

  @ApiProperty({
    description:
      'Identificador de una tecnología en un stack tecnológico de un proyecto de un cliente',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  technologyStackId: string;
}
