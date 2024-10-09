import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class NewLevelRequestDto {
  @ApiProperty({
    description: 'Nombre del nivel en el sistema',
    example: 'Junior',
    examples: ['Junior', 'Middle', 'Senior'],
    required: true,
    maxLength: 30,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  name: string;

  @ApiProperty({
    description: 'Peso (importancia) del nivel. Acepta hasta dos decimales',
    example: 0.8,
    minimum: 0.0,
    maximum: 1.0,
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  weight: number;
}
