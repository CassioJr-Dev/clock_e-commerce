import { UseCase as DefaultUseCase } from '@/shared/usecases/use-case'
import { UserRepository } from '@/user/infrastructure/database/repository/user.repository'
import { Injectable } from '@nestjs/common'

export namespace DeleteUserService {
  export type Input = {
    userId: string
  }

  export type Output = void

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(input: Input): Promise<void> {
      await this.userRepository.delete(input.userId)
    }
  }
}
