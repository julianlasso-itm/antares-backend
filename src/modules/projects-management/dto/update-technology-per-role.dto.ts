import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTechnologyPerRoleDto {
  @IsOptional()
  @IsString()
  @MaxLength(26)
  roleId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(26)
  technologyStackId?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
