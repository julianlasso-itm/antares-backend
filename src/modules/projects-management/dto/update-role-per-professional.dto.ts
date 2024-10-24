import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateRolePerProfessionalDto {
  @IsOptional()
  @IsString()
  @MaxLength(26)
  roleId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(26)
  professionalId?: string;

  @IsOptional()
  startDate?: Date;

  @IsOptional()
  endDate?: Date;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
