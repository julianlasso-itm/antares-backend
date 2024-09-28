import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewKnowledgeGapRequestDto {
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
  @MaxLength(8192)
  observation: string;
}
