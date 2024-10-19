import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateIf,
} from 'class-validator';

export class NewDomainQuestionsAnswersRequestDto {
  @IsOptional()
  @IsString()
  @Matches(/^[0-9a-zA-Z]{26}$/, {
    message: 'NewDomainQuestionsAnswersRequestDto',
  })
  @MaxLength(26)
  @ValidateIf(
    (object: NewDomainQuestionsAnswersRequestDto) =>
      object.domainKnowledgeLevelId === null ||
      object.domainKnowledgeLevelId.length === 0,
  )
  domainKnowledgeId: string | null;

  @IsOptional()
  @IsString()
  @Matches(/^[0-9a-zA-Z]{26}$/, {
    message: 'NewDomainQuestionsAnswersRequestDto',
  })
  @MaxLength(26)
  @ValidateIf(
    (object: NewDomainQuestionsAnswersRequestDto) =>
      object.domainKnowledgeId === null ||
      object.domainKnowledgeId.length === 0,
  )
  domainKnowledgeLevelId: string | null;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  question: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(8192)
  answer: string;
}
