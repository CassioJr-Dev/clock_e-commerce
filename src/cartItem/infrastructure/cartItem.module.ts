import { DatabaseModule } from '@/shared/database/database.module'
import { Module } from '@nestjs/common'
import { AddItemService } from '../application/usecases/addItem-cart/addItem.service'
import { FindAllItemsService } from '../application/usecases/findAll-cart/findAll.service'
import { GetItemService } from '../application/usecases/getItem-cart/getItem.service'
import { UpdateItemService } from '../application/usecases/updateQuantity-cart/updateQuantity.service'
import { CartItemController } from './cartItem.controller'
import { CartItemRepository } from './database/repository/cartItem.repository'

@Module({
  imports: [DatabaseModule],
  controllers: [CartItemController],
  providers: [
    CartItemRepository,
    AddItemService.UseCase,
    GetItemService.UseCase,
    FindAllItemsService.UseCase,
    UpdateItemService.UseCase,
  ],
})
export class CartItemModule {}
