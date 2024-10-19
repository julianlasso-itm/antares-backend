import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class NewDomainKnowledgeLevelsRequestDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9a-zA-Z]{26}$/, {
    message: 'NewDomainKnowledgeLevelsRequestDto',
  })
  @MaxLength(26)
  domainKnowledgeId: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9a-zA-Z]{26}$/, {
    message: 'NewDomainKnowledgeLevelsRequestDto',
  })
  @MaxLength(26)
  configurationLevelId: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9a-zA-Z]{26}$/, {
    message: 'NewDomainKnowledgeLevelsRequestDto',
  })
  @MaxLength(26)
  levelId: string;
}
