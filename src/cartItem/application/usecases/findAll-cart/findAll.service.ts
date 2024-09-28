import { CartItemRepository } from '@/cartItem/infrastructure/database/repository/cartItem.repository'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { Injectable } from '@nestjs/common'

export namespace FindAllItemsService {
  export type Input = {
    cartId: string
    userId: string
  }

  export type Output = any
  // export type Output = (CartItemOutput & ProductOutput)[]

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly cartItemRepository: CartItemRepository) {}

    async execute(input: Input): Promise<Output> {
      return this.cartItemRepository.findAll(input.cartId, input.userId)
    }
  }
}
