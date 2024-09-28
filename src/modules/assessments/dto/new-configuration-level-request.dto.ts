import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewConfigurationLevelRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;
}
