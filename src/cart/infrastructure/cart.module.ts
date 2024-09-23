import { DatabaseModule } from '@/shared/database/database.module'
import { Module } from '@nestjs/common'
import { CreateCartService } from '../application/usecases/create-cart/create-cart.service'
import { DeleteCartService } from '../application/usecases/delete-cart/delete-cart.service'
import { GetCartService } from '../application/usecases/get-cart/get-cart.service'
import { CartController } from './cart.controller'
import { CartRepository } from './database/repository/cart.repository'

@Module({
  imports: [DatabaseModule],
  controllers: [CartController],
  providers: [
    CartRepository,
    CreateCartService.UseCase,
    GetCartService.UseCase,
    DeleteCartService.UseCase,
  ],
})
export class CartModule { }
