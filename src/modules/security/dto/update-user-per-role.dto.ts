import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserPerRoleDto {
  @IsOptional()
  @IsString()
  @MaxLength(26)
  userId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(26)
  roleId?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
