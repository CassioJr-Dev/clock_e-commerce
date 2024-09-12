import { DatabaseModule } from '@/shared/database/database.module'
import { HashProviderModule } from '@/shared/providers/hash-provider/hash-provider.module'
import { Module } from '@nestjs/common'
import { CreateUserService } from '../application/usecases/create-user/create-user.service'
import { DeleteUserService } from '../application/usecases/delete-user/delete-user.service'
import { FindAllUsersService } from '../application/usecases/find-all-users/find-all-users.service'
import { GetUserService } from '../application/usecases/get-user/get-user.service'
import { LoginUserService } from '../application/usecases/login-user/login-user.service'
import { UpdateUserService } from '../application/usecases/update-user/update-user.service'
import { UserRepository } from './database/repository/user.repository'
import { UserController } from './user.controller'

@Module({
  imports: [DatabaseModule, HashProviderModule],
  controllers: [UserController],
  providers: [
    UserRepository,
    CreateUserService.UseCase,
    UpdateUserService.UseCase,
    GetUserService.UseCase,
    DeleteUserService.UseCase,
    FindAllUsersService.UseCase,
    LoginUserService,
  ],
})
export class UserModule {}
