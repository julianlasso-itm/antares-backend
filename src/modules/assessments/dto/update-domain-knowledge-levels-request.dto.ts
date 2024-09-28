import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateDomainKnowledgeLevelsRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(26)
  domainKnowledgeId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(26)
  configurationLevelId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(26)
  levelId?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
