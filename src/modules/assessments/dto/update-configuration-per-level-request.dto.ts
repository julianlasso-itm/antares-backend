import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateConfigurationPerLevelRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(26)
  configurationLevelId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(26)
  levelId?: string;

  @IsOptional()
  @IsInt()
  position?: number;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
