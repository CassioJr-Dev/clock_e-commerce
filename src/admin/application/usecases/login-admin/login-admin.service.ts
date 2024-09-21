import { AdminRepository } from '@/admin/infrastructure/database/repository/admin.repository'
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { HashProviderService } from '@/shared/providers/hash-provider/hash-provider.service'
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common"
import { AdminOutput } from '../../dtos/admin-output.dto'

export namespace LoginAdminService {
  export type Input = {
    email: string
    password: string
  }

  export type Output = AdminOutput

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private adminRepository: AdminRepository,
      private hashProvider: HashProviderService,
    ) { }

    async execute(input: Input) {
      const { email, password } = input

      if (!email || !password) {
        throw new BadRequestException('Dados de entrada não fornecidos')
      }

      const entity = await this.adminRepository.findByEmail(email)

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
