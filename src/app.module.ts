import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProductModule } from './product/infrastructure/product.module'
import { DatabaseModule } from './shared/database/database.module'
import { UserModule } from './user/infrastructure/user.module'
import { CreateProductService } from './product/application/usecases/create-product/create-product.service'
import { DeleteProductService } from './product/application/usecases/delete-product/delete-product.service'
import { SearchProductService } from './product/application/usecases/search-product/search-product.service'
import { GetProductService } from './product/application/usecases/get-product/get-product.service'
import { UpdateProductService } from './product/application/usecases/update-product/update-product.service'

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UserModule, ProductModule],
  controllers: [AppController],
  providers: [
    AppService,
    CreateProductService,
    DeleteProductService,
    SearchProductService,
    GetProductService,
    UpdateProductService,
  ],
})
export class AppModule {}
