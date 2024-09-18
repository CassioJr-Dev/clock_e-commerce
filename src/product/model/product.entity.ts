import { Product } from '@prisma/client'

export class ProductEntity implements Omit<Product, 'price' | 'oldPrice'> {
  productId: string
  name: string
  description: string
  price: number
  oldPrice: number
  stock: number
  image: string
  category: string
  adminId: string
  created_at: Date
}
