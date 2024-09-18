import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(12)
  @MinLength(8)
  password: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(13)
  @MinLength(13)
  telephone: string
}
