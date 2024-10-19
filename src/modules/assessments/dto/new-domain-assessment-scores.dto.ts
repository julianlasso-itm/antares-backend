import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class NewDomainAssessmentScoresDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9a-zA-Z]{26}$/, {
    message: 'NewDomainAssessmentScoresDto',
  })
  @MaxLength(26)
  assessmentId: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9a-zA-Z]{26}$/, {
    message: 'NewDomainAssessmentScoresDto',
  })
  @MaxLength(26)
  domainKnowledgeId: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9a-zA-Z]{26}$/, {
    message: 'NewDomainAssessmentScoresDto',
  })
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
