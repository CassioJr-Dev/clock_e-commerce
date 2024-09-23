import { DatabaseModule } from '@/shared/database/database.module'
import { Module } from '@nestjs/common'
import { CartController } from './cart.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [CartController],
})
export class CartModule {}
