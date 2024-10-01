import { AddressRepository } from '@/address/infrastructure/database/repository/address.repository'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { Injectable } from '@nestjs/common'
import { AddressOutput } from '../../dtos/address-output.dto'

export namespace GetAddressService {
  export type Input = {
    addressId: string
    itemId: string
  }
  export type Output = AddressOutput

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly addressRepository: AddressRepository) {}

    async execute(input: Input): Promise<Output> {
      return this.addressRepository.findById(input.addressId)
    }
  }
}
