import { IsBoolean, IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProfessionalsRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(500)
  name?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  @MaxLength(500)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  photo?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
