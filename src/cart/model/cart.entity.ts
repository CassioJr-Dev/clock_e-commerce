import { Cart } from '@prisma/client'

export class CartEntity implements Cart {
  cartId: string
  userId: string
  created_at: Date
}
