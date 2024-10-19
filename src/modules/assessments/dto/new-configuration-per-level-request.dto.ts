import {
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class NewConfigurationPerLevelRequestDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9a-zA-Z]{26}$/, {
    message: 'NewConfigurationPerLevelRequestDto',
  })
  @MaxLength(26)
  configurationLevelId: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9a-zA-Z]{26}$/, {
    message: 'NewConfigurationPerLevelRequestDto',
  })
  @MaxLength(26)
  levelId: string;

  @IsNotEmpty()
  @IsInt()
  position: number;
}
