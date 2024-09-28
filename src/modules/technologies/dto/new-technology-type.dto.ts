import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewTechnologyTypeDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  name: string;

  @IsString()
  @MaxLength(2048)
  description?: string;
}
