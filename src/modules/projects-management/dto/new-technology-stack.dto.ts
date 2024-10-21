import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class NewTechnologyStackDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  projectId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  technologyItemId: string;

  @IsNotEmpty()
  @IsNumberString()
  @Matches(/^(?:0(?:\.\d{1,2})?|1(?:\.0{1,2})?)$/, {
    message: 'weight must be a number between 0.00 and 1.00',
  })
  weight: string;
}
