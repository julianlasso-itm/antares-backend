import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateRoleDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2048)
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(26)
  subRoleId?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
