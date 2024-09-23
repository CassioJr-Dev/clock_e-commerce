import { UpdateProductService } from '@/product/application/usecases/update-product/update-product.service'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateProductDto
  implements Omit<UpdateProductService.Input, 'adminId' | 'productId'>
{
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsNumber()
  @IsOptional()
  price?: number

  @IsNumber()
  @IsOptional()
  @IsOptional()
  oldPrice?: number

  @IsNumber()
  @IsOptional()
  stock?: number

  @IsString()
  @IsOptional()
  image?: string

  @IsString()
  @IsOptional()
  category?: string
}
