import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

export class LoginUserDto {
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
}
