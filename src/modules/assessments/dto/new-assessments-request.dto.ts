import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewAssessmentsRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  rolePerProfessionalId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  userId: string;
}
