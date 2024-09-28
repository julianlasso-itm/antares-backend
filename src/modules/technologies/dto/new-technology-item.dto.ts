import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewTechnologyItemDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  name: string;

  @IsString()
  @MaxLength(2048)
  description?: string;

  @IsString()
  @MaxLength(500)
  icon?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  technologyTypeId: string;
}
