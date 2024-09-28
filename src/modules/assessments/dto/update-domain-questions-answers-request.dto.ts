import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateDomainQuestionsAnswersRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(500)
  question?: string;

  @IsOptional()
  @IsString()
  @MaxLength(8192)
  answer?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
