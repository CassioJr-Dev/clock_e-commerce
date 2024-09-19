import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case'
import { Injectable } from '@nestjs/common'

export namespace SearchProductService {
  export type Input = {}
  export type Output = {}

  @Injectable()
  export class UseCase implements DefaultUseCase<Input, Output> {
    execute(input: Input): Output | Promise<Output> {
      throw new Error('Method not implemented.')
    }
  }
}
