import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateDomainKnowledgeDto {
  @IsOptional()
  @IsString()
  @MaxLength(26)
  technologyItemId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  domain?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1024)
  topic?: string;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
