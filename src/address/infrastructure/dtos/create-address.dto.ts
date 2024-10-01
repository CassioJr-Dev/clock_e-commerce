import { AddressOutput } from '@/address/application/dtos/address-output.dto'

export class CreateAddressDto implements AddressOutput {
  addressId: string
  cep: string
  street: string
  complement: string
  unit: string
  neighborhood: string
  city: string
  uf: string
  state: string
  userId: string
  created_at: Date
}
