import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class NewTechnologyItemDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(2048)
  description?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  icon?: string | null;

  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  technologyTypeId: string;
}
