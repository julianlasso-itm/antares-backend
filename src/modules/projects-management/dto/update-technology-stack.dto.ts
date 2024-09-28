import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTechnologyStackDto {
  @IsOptional()
  @IsString()
  @MaxLength(26)
  projectId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(26)
  technologyItemId?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
