import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { DocumentType } from '../enums';

export class NewProfessionalsRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  @IsEnum(DocumentType)
  documentType: DocumentType;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  document: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(500)
  email: string;

  @IsString()
  @MaxLength(1024)
  photo?: string;
}
