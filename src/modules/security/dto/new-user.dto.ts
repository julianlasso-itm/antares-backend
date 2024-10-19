import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(500)
  email: string;
}
