import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NewUserDto {
  @ApiProperty({
    description: 'Nombre del usuario en el sistema',
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
    description: 'Correo electrónico del usuario en el sistema',
    example: 'julian.lasso@sofka.com.co',
    required: true,
    maxLength: 500,
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(500)
  email: string;
}
