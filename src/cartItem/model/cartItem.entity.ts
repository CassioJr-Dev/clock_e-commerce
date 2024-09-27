import { CartItem } from '@prisma/client'

export class CartItemEntity implements CartItem {
  itemId: string
  cartId: string
  productId: string
  quantity: number
  created_at: Date
}
