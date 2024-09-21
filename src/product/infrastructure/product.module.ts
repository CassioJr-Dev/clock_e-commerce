import { AuthModule } from '@/auth/auth.module'
import { DatabaseModule } from '@/shared/database/database.module'
import { Module } from '@nestjs/common'
import { CreateProductService } from '../application/usecases/create-product/create-product.service'
import { DeleteProductService } from '../application/usecases/delete-product/delete-product.service'
import { GetProductService } from '../application/usecases/get-product/get-product.service'
import { SearchProductService } from '../application/usecases/search-product/search-product.service'
import { UpdateProductService } from '../application/usecases/update-product/update-product.service'
import { ProductRepository } from './database/repository/product.repository'
import { ProductController } from './product.controller'

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ProductController],
  providers: [
    ProductRepository,
    CreateProductService.UseCase,
    GetProductService.UseCase,
    SearchProductService.UseCase,
    UpdateProductService.UseCase,
    DeleteProductService.UseCase,
  ],
})
export class ProductModule {}
