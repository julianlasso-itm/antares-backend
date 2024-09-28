import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewLevelRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  name: string;
}
