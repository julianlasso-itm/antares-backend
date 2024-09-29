import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;
}
