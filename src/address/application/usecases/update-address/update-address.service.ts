import { AddressRepository } from '@/address/infrastructure/database/repository/address.repository'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { Injectable, NotFoundException } from '@nestjs/common'
import { AddressInput } from '../../dtos/address-input.dto'
import { AddressOutput } from '../../dtos/address-output.dto'

export namespace UpdateAddressService {
  export type Input = AddressInput & { addressId: string }

  export type Output = AddressOutput

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly addressRepository: AddressRepository) {}

    async execute(input: Input): Promise<Output> {
      const { addressId, userId, ...updateFields } = input

      const address = await this.addressRepository.findById(addressId)

      if (!address) {
        throw new NotFoundException(
          `Endereço não encontrado usando o ID: ${input.addressId}`,
        )
      }

      Object.entries(updateFields).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          address[key] = value
        }
      })

      return this.addressRepository.update({ ...address })
    }
  }
}
