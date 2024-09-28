import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewDomainKnowledgeLevelsRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  domainKnowledgeId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  configurationLevelId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  levelId: string;
}
