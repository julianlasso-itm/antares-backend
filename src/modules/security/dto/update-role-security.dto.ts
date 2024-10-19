import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateRoleSecurityDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  description?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
