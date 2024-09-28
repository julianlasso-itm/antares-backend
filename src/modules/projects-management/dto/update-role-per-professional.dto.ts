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
  @IsString()
  @MaxLength(30)
  startDate?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  endDate?: Date;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
