import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewUserPerRoleDto {
  @ApiProperty({
    description: 'Identificador del usuario en el sistema',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  userId: string;

  @ApiProperty({
    description: 'Identificador del rol en el sistema',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  roleId: string;
}
