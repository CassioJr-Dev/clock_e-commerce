import { CreateProductService } from '@/product/application/usecases/create-product/create-product.service'

export class CreateProductDto
  implements Omit<CreateProductService.Input, 'adminId'>
{
  name: string
  description?: string
  price: number
  oldPrice?: number
  stock: number
  image: string
  category: string
}
