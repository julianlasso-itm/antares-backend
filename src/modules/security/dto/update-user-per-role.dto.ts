import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserPerRoleDto {
  @ApiProperty({
    description: 'Identificador del usuario en el sistema',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: false,
    maxLength: 26,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(26)
  userId?: string;

  @ApiProperty({
    description: 'Identificador del rol en el sistema',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: false,
    maxLength: 26,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(26)
  roleId?: string;

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
