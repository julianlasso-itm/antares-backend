import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewConfigurationLevelRequestDto {
  @ApiProperty({
    description: 'Nombre del nivel de configuración',
    example: 'Configuración 2023',
    required: true,
    maxLength: 50,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;
}
