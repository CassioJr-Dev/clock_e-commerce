import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { UserRepository } from '@/user/infrastructure/database/repository/user.repository'
import { Injectable } from '@nestjs/common'
import { UserInput } from '../../dtos/user-input'
import { UserOutput } from '../../dtos/user-output'

export namespace UpdateUserService {
  export type Input = UserInput & { userId: string }

  export type Output = UserOutput

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(input: Input): Promise<Output> {
      const { userId, name, email, password, telephone } = input

      const user = await this.userRepository.findById(userId)

      if (name) user.name = name
      if (email) user.email = email
      if (password) user.password = password
      if (telephone) user.telephone = telephone

      return await this.userRepository.update({ ...user })
    }
  }
}
