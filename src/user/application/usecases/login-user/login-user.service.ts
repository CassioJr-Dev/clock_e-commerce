import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { HashProviderService } from '@/shared/providers/hash-provider/hash-provider.service'
import { UserRepository } from '@/user/infrastructure/database/repository/user.repository'
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { UserOutput } from '../../dtos/user-output'

export namespace LoginUserService {
  export type Input = {
    email: string
    password: string
  }

  export type Output = UserOutput

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository,
      private hashProvider: HashProviderService,
    ) {}

    async execute(input: Input) {
      const { email, password } = input

      if (!email || !password) {
        throw new BadRequestException('Dados de entrada não fornecidos')
      }

      const entity = await this.userRepository.findByEmail(email)

      const hashPasswordMatches = await this.hashProvider.compareHash(
        password,
        entity.password,
      )

      if (!hashPasswordMatches) {
        throw new UnauthorizedException('Credenciais inválidas')
      }

      return entity
    }
  }
}
