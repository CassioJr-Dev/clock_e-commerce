import { CartItemRepository } from '@/cartItem/infrastructure/database/repository/cartItem.repository'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { Injectable } from '@nestjs/common'
import { CartItemOutput } from '../../dtos/cartItem-output.dto'

export namespace GetItemService {
  export type Input = {
    cartId: string
    itemId: string
  }
  export type Output = CartItemOutput

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly cartItemRepository: CartItemRepository) {}

    async execute(input: Input): Promise<Output> {
      return this.cartItemRepository.findItem(input.itemId, input.cartId)
    }
  }
}
