import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateConfigurationLevelRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
