import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewRoleSecurityDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  @MaxLength(1024)
  description: string;
}
