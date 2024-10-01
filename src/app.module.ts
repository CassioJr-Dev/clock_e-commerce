import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AddressModule } from './address/infrastructure/address.module'
import { AdminModule } from './admin/infrastructure/admin.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CartModule } from './cart/infrastructure/cart.module'
import { CartItemModule } from './cartItem/infrastructure/cartItem.module'
import { ProductModule } from './product/infrastructure/product.module'
import { DatabaseModule } from './shared/database/database.module'
import { UserModule } from './user/infrastructure/user.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
    ProductModule,
    AdminModule,
    CartModule,
    CartItemModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
