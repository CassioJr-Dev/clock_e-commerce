import { DatabaseModule } from '@/shared/database/database.module'
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
