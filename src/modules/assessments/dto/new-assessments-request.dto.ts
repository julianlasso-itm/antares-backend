import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class NewAssessmentsRequestDto {
  @ApiProperty({
    description: 'Identificador del rol y el usuario en el sistema',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  @Matches(/^[0-9a-zA-Z]{26}$/, {
    message: 'NewAssessmentsRequestDto',
  })
  rolePerProfessionalId: string;

  @ApiProperty({
    description:
      'Identificador del usuario en el sistema que realizó el assessment',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9a-zA-Z]{26}$/, {
    message: 'NewAssessmentsRequestDto',
  })
  @MaxLength(26)
  userId: string;
}
