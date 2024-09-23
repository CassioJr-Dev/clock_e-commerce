import { CreateProductService } from '@/product/application/usecases/create-product/create-product.service'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateProductDto
  implements Omit<CreateProductService.Input, 'adminId'>
{
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @IsNumber()
  @IsNotEmpty()
  price: number

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  oldPrice?: number

  @IsNumber()
  @IsNotEmpty()
  stock: number

  @IsString()
  @IsNotEmpty()
  image: string

  @IsString()
  @IsNotEmpty()
  category: string
}
