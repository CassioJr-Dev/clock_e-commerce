import { AddressRepository } from '@/address/infrastructure/database/repository/address.repository'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { DateProviderService } from '@/shared/providers/date-provider/date-provider.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { AddressInput } from '../../dtos/address-input.dto'
import { AddressOutput } from '../../dtos/address-output.dto'

export namespace CreateAddressService {
  export type Input = AddressInput

  export type Output = AddressOutput

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly addressRepository: AddressRepository) {}

    async execute(input: Input): Promise<Output> {
      const { complement, ...inputAddress } = input

      if (Object.values(inputAddress).some(value => !value)) {
        throw new BadRequestException('Todos os campos são obrigatórios.')
      }

      const addressId = randomUUID()

      const created_at = DateProviderService.toDate()

      const entity = {
        addressId,
        ...input,
        created_at,
      }

      return await this.addressRepository.insert(entity)
    }
  }
}
