import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateIf,
} from 'class-validator';

export class NewTechnologyStackDto {
  @ApiProperty({
    description: 'Identificador del proyecto de un cliente',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  projectId: string;

  @ApiProperty({
    description: 'Identificador de una tecnología',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  technologyItemId: string;

  @ApiProperty({
    description: 'Peso (importancia) de la tecnología',
    example: 0.8,
    minimum: 0.0,
    maximum: 1.0,
    required: false,
    type: Number,
  })
  @IsOptional()
  @ValidateIf(
    (object: NewTechnologyStackDto) => object.weight?.toString() !== '',
  )
  @IsNumberString()
  @Matches(/^(?:0(?:\.\d{1,2})?|1(?:\.0{1,2})?)$/, {
    message: 'weight must be a number between 0.00 and 1.00',
  })
  weight?: number | null;
}
