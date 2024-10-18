import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class NewConfigurationPerLevelRequestDto {
  @ApiProperty({
    description: 'Identificador del nivel de configuración',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9a-zA-Z]{26}$/, {
    message: 'NewConfigurationPerLevelRequestDto',
  })
  @MaxLength(26)
  configurationLevelId: string;

  @ApiProperty({
    description: 'Identificador del nivel en una configuración',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9a-zA-Z]{26}$/, {
    message: 'NewConfigurationPerLevelRequestDto',
  })
  @MaxLength(26)
  levelId: string;

  @ApiProperty({
    description: 'Posición del nivel en la configuración. Sólo números enteros',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsInt()
  position: number;
}
