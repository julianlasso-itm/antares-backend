import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateKnowledgeGapNoteRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(8192)
  note?: string;
}
