import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewTechnologyStackDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  projectId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  technologyItemId: string;
}
