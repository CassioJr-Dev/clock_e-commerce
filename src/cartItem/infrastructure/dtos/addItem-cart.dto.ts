import { AddItemService } from '@/cartItem/application/usecases/addItem-cart/addItem.service'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class AddItemDto implements Omit<AddItemService.Input, 'userId'> {
  @IsString()
  @IsNotEmpty()
  cartId: string

  @IsString()
  @IsNotEmpty()
  productId: string

  @IsNumber()
  @IsOptional()
  quantity?: number
}
