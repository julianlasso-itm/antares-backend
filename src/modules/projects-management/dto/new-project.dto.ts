import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewProjectDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  name: string;

  @IsString()
  @MaxLength(2048)
  description?: string;

  @IsString()
  @MaxLength(26)
  customerId: string;
}
