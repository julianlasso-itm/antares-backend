import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  @MaxLength(500)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2048)
  description?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
