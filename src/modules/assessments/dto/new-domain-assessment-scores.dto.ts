import { IsNotEmpty, IsString, MaxLength, IsNumber, IsOptional } from 'class-validator';

export class NewDomainAssessmentScoresDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  assessmentId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  domainKnowledgeId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  configurationLevelId: string;

  @IsOptional()
  @IsString()
  @MaxLength(8192)
  observations: string | null;

  @IsNotEmpty()
  @IsNumber()
  score: number;
}
