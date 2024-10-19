import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewUserPerRoleDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  userId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  roleId: string;
}
