import { AddressInput } from '@/address/application/dtos/address-input.dto'
import { IsNotEmpty, IsOptional, IsPostalCode, IsString } from 'class-validator'

export class CreateAddressDto implements Omit<AddressInput, 'userId'> {
  @IsPostalCode('BR', { message: 'Código postal inválido para o Brasil.' })
  @IsString()
  @IsNotEmpty()
  cep: string

  @IsString()
  @IsNotEmpty()
  street: string

  @IsString()
  @IsOptional()
  complement: string

  @IsString()
  @IsNotEmpty()
  unit: string

  @IsString()
  @IsNotEmpty()
  neighborhood: string

  @IsString()
  @IsNotEmpty()
  city: string

  @IsString()
  @IsNotEmpty()
  uf: string

  @IsString()
  @IsNotEmpty()
  state: string
}
