export type ProductOutput = {
  productId: string
  name: string
  description: string | null
  price: number
  oldPrice: number | null
  stock: number
  image: string
  category: string
  adminId: string
  created_at: Date
}
