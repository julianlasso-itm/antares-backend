import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewRoleDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(2048)
  description?: string;
}
