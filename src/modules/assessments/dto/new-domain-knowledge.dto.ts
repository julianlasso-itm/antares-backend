import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class NewDomainKnowledgeDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9a-zA-Z]{26}$/, {
    message: 'NewDomainKnowledgeDto',
  })
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
