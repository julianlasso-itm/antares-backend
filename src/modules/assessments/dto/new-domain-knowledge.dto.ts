import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class NewDomainKnowledgeDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  technologyItemId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  domain: string;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  topic?: string;

  @IsOptional()
  @IsNumber()
  weight?: number;
}
