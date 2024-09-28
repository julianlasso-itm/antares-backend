import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateLevelRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  name?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
