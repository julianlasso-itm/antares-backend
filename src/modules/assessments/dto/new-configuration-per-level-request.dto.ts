import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewConfigurationPerLevelRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  configurationLevelId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  levelId: string;

  @IsNotEmpty()
  @IsInt()
  position: number;
}
