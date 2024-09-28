import { CartRepository } from '@/cart/infrastructure/database/repository/cart.repository'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { Injectable } from '@nestjs/common'
import { CartInput } from '../../dtos/cart-input'
import { CartOutput } from '../../dtos/cart-output'

export namespace GetCartService {
  export type Input = CartInput
  export type Output = CartOutput

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly cartRepository: CartRepository) {}

    async execute(input: Input): Promise<Output> {
      return this.cartRepository.findCart(input.userId)
    }
  }
}
