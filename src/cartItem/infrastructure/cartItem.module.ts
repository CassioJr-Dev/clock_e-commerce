import { DatabaseModule } from '@/shared/database/database.module'
import { Module } from '@nestjs/common'
import { CartItemController } from './cartItem.controller'
import { CartItemRepository } from './database/repository/cartItem.repository'

@Module({
  imports: [DatabaseModule],
  controllers: [CartItemController],
  providers: [CartItemRepository],
})
export class CartItemModule {}
