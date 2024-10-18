import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class NewDomainKnowledgeLevelsRequestDto {
  @ApiProperty({
    description: 'Identificador del dominio de conocimiento',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9a-zA-Z]{26}$/, {
    message: 'NewDomainKnowledgeLevelsRequestDto',
  })
  @MaxLength(26)
  domainKnowledgeId: string;

  @ApiProperty({
    description: 'Identificador de la configuración usada',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9a-zA-Z]{26}$/, {
    message: 'NewDomainKnowledgeLevelsRequestDto',
  })
  @MaxLength(26)
  configurationLevelId: string;

  @ApiProperty({
    description: 'Identificador del nivel del dominio de conocimiento',
    example: '01J8XM2FC49N58RTHH671GPFVV',
    required: true,
    maxLength: 26,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9a-zA-Z]{26}$/, {
    message: 'NewDomainKnowledgeLevelsRequestDto',
  })
  @MaxLength(26)
  levelId: string;
}
