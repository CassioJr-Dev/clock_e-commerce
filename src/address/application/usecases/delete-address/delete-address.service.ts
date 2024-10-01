import { AddressRepository } from '@/address/infrastructure/database/repository/address.repository'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { Injectable } from '@nestjs/common'

export namespace DeleteAddressService {
  export type Input = {
    addressId: string
    userId: string
  }
  export type Output = void

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly addressRepository: AddressRepository) {}

    async execute(input: Input): Promise<Output> {
      await this.addressRepository.delete(input.addressId, input.userId)
    }
  }
}
