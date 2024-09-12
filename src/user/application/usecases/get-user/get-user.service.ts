import { UseCase as DefaultUseCase } from '@/shared/usecases/use-case';
import { UserRepository } from '@/user/infrastructure/database/repository/user.repository';
import { Injectable } from '@nestjs/common';
import { UserOutput } from '../../dtos/user-output';

export namespace GetUserService {
  export type Input = {
    userId: string
  }

  export type Output = UserOutput

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(input: Input) {
      return this.userRepository.findById(input.userId)
    }

  }

}
