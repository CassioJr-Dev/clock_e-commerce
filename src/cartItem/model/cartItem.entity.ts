import { CartItem } from '@prisma/client'

export class CartItemEntity implements CartItem {
  cartItemId: string
  cartId: string
  productId: string
  quantity: number
  created_at: Date
}
