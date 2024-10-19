import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class NewRatingScaleRequestDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9a-zA-Z]{26}$/, {
    message: 'NewRatingScaleRequestDto',
  })
  @MaxLength(26)
  configurationLevelId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsInt()
  position: number;
}
