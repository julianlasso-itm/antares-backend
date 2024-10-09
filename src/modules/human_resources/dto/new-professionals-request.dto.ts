import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { DocumentType } from '../enums';

export class NewProfessionalsRequestDto {
  @ApiProperty({
    description: 'Tipo de documento',
    example: 'CC',
    examples: ['CC', 'CE'],
    enum: DocumentType,
    required: true,
    maxLength: 2,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  @IsEnum(DocumentType)
  documentType: DocumentType;

  @ApiProperty({
    description: 'Número de documento',
    example: '123456789',
    required: true,
    maxLength: 20,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  document: string;

  @ApiProperty({
    description: 'Nombre completo del profesional',
    example: 'Julian Andres Lasso Figueroa',
    required: true,
    maxLength: 500,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  name: string;

  @ApiProperty({
    description: 'Correo electrónico del profesional',
    example: 'julian.lasso@sofka.com.co',
    required: true,
    maxLength: 500,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(500)
  email: string;

  @ApiProperty({
    description: 'Foto del profesional',
    example: '/icons/100860/photo.png',
    required: false,
    maxLength: 1024,
    type: String,
  })
  @IsString()
  @MaxLength(1024)
  photo?: string;
}
