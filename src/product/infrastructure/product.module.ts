import { DatabaseModule } from '@/shared/database/database.module'
import { Module } from '@nestjs/common'
import { ProductRepository } from './database/repository/product.repository'
import { ProductController } from './product.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [ProductRepository],
})
export class ProductModule {}
