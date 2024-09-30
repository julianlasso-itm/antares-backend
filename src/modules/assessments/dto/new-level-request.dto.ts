import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

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
}
