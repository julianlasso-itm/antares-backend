import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewProjectDto {
  @IsString()
  @MaxLength(26)
  customerId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  name: string;
}
