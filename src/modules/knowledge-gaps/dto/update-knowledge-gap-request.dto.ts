import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateKnowledgeGapRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(8192)
  observation?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
