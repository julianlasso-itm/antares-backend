import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateConfigurationLevelRequestDto {
  @ApiProperty({
    description: 'Nombre del nivel en el sistema',
    example: 'Junior',
    examples: ['Junior', 'Middle', 'Senior', null],
    required: false,
    maxLength: 50,
    type: String,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @ApiProperty({
    description: 'Estado del registro. True activo, False inactivo',
    example: true,
    examples: [true, false, null],
    required: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
