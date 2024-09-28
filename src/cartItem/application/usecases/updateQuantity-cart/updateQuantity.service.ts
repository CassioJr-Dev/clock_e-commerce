import { CartItemRepository } from '@/cartItem/infrastructure/database/repository/cartItem.repository'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { Injectable } from '@nestjs/common'
import { CartItemInput } from '../../dtos/cartItem-input.dto'
import { CartItemOutput } from '../../dtos/cartItem-output.dto'

export namespace UpdateItemService {
  export type Input = Required<CartItemInput & { itemId: string, userId: string }>
  export type Output = CartItemOutput

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly cartItemRepository: CartItemRepository) { }

    async execute(input: Input,): Promise<Output> {

      const userId = input.userId

      delete input.userId
      const item = await this.cartItemRepository.findItem(input.itemId, userId)

      if (input.quantity) item.quantity = input.quantity


      return await this.cartItemRepository.updateQuantity(input, userId)
    }
  }
}
