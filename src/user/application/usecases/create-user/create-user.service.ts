import { DateProviderService } from '@/shared/providers/date-provider/date-provider.service'
import { HashProviderService } from '@/shared/providers/hash-provider/hash-provider.service'
import { UseCase as DefaultUseCase } from '@/shared/usecases/use-case'
import { UserRepository } from '@/user/infrastructure/database/repository/user.repository'
import { BadRequestException, Injectable } from '@nestjs/common'
import { randomUUID } from 'node:crypto'
import { UserInput } from '../../dtos/user-input'

export namespace CreateUserService {
  export type Input = UserInput

  export type Output = void

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private readonly userRepository: UserRepository,
      private readonly hashProvider: HashProviderService,
    ) {}
    async execute(input: Input): Promise<Output> {
      const { name, email, password, telephone } = input

      if (!name || !email || !password || !telephone) {
        throw new BadRequestException('Dados de entrada não fornecidos')
      }

      await this.userRepository.emailExists(email)

      const hashPassword = await this.hashProvider.generateHash(password)

      const userId = randomUUID()

      const created_at = DateProviderService.toDate()

      const entity = {
        userId,
        name,
        email,
        password: hashPassword,
        telephone,
        created_at,
      }

      return await this.userRepository.insert(entity)
    }
  }
}
