import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateDomainQuestionsAnswersRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(26)
  domainKnowledgeId?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(26)
  domainKnowledgeLevelId?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  question?: string;

  @IsOptional()
  @IsString()
  @MaxLength(8192)
  answer?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
