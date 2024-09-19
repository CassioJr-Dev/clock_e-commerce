import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { UserRepository } from '@/user/infrastructure/database/repository/user.repository'
import { Injectable } from '@nestjs/common'
import { UserOutput } from '../../dtos/user-output'

export namespace FindAllUsersService {
  export type Input = null

  export type Output = UserOutput[]

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(): Promise<Output> {
      return this.userRepository.findAll()
    }
  }
}
