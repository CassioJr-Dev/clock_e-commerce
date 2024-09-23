import { CartRepository } from '@/cart/infrastructure/database/repository/cart.repository'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { Injectable } from '@nestjs/common'
import { CartInput } from '../../dtos/cart-input'

export namespace DeleteCartService {
  export type Input = CartInput & { cartId: string }

  export type Output = void

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly cartRepository: CartRepository) {}

    async execute(input: Input): Promise<Output> {
      await this.cartRepository.deleteCart(input.cartId, input.userId)
    }
  }
}
