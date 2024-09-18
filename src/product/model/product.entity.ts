import { Product } from '@prisma/client'

export class ProductEntity implements Omit<Product, 'price'> {
  productId: string
  name: string
  description: string
  price: number
  stock: number
  adminId: string
  created_at: Date
}
