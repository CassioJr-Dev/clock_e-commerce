import { UpdateProductService } from '@/product/application/usecases/update-product/update-product.service'

export class UpdateProductDto
  implements Omit<UpdateProductService.Input, 'adminId' | 'productId'>
{
  name?: string
  description?: string
  price?: number
  oldPrice?: number
  stock?: number
  image?: string
  category?: string
}
