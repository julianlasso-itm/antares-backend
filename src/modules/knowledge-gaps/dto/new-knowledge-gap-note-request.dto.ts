import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewKnowledgeGapNoteRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(26)
  knowledgeGapId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(8192)
  observation: string;
}
