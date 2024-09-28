import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewCustomerDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  name: string;
}
