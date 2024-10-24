import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class NewRolePerProfessionalDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  roleId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  professionalId: string;

  @IsNotEmpty()
  startDate: Date;

  @IsOptional()
  endDate: Date | null;
}
