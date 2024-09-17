import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  name?: string

  @IsString()
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string

  @IsString()
  @IsOptional()
  @MaxLength(12)
  @MinLength(8)
  password?: string

  @IsString()
  @IsOptional()
  @MaxLength(13)
  @MinLength(13)
  telephone?: string
}
