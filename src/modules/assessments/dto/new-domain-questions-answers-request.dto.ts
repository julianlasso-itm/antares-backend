import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewDomainQuestionsAnswersRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  domainKnowledgeId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  domainKnowledgeLevelId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  question: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(8192)
  answer: string;
}
