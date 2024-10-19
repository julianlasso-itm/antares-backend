import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateRoleProjectManagementDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2048)
  description?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
