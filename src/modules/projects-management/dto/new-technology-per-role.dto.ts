import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewTechnologyPerRoleDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  roleId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  technologyStackId: string;
}
