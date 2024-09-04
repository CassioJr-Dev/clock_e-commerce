import { DatabaseModule } from '@/shared/database/database.module'
import { Module } from '@nestjs/common'
import { UserRepository } from './database/repository/user.repository'
import { UserController } from './user.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserRepository],
})
export class UserModule { }
