import {
  IsBoolean,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateIf,
} from 'class-validator';

export class UpdateTechnologyStackDto {
  @IsOptional()
  @IsString()
  @MaxLength(26)
  projectId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(26)
  technologyItemId?: string;

  @IsOptional()
  @IsNumberString()
  @Matches(/^(?:0(?:\.\d{1,2})?|1(?:\.0{1,2})?)$/, {
    message: 'weight must be a number between 0.00 and 1.00',
  })
  weight?: number | null;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
