import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateAssessmentsRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(8192)
  observations?: string;

  @IsOptional()
  @IsNumber()
  score?: number;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
