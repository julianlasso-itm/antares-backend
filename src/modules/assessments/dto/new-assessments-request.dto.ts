import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class NewAssessmentsRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  @Matches(/^[0-9a-zA-Z]{26}$/, {
    message: 'NewAssessmentsRequestDto',
  })
  rolePerProfessionalId: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9a-zA-Z]{26}$/, {
    message: 'NewAssessmentsRequestDto',
  })
  @MaxLength(26)
  userId: string;
}
