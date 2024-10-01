import { AddressInput } from '@/address/application/dtos/address-input.dto'
import { IsNotEmpty, IsPostalCode, IsString } from 'class-validator'

export class CreateAddressDto implements Omit<AddressInput, 'userId'> {
  @IsPostalCode('BR', { message: 'Código postal inválido para o Brasil.' })
  @IsString()
  @IsNotEmpty()
  cep: string

  @IsString()
  @IsNotEmpty()
  street: string

  @IsString()
  @IsNotEmpty()
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
