import { AuthModule } from '@/auth/auth.module'
import { DatabaseModule } from '@/shared/database/database.module'
import { Module } from '@nestjs/common'
import { CreateAddressService } from '../application/usecases/create-address/create-address.service'
import { DeleteAddressService } from '../application/usecases/delete-address/delete-address.service'
import { FindAllAddressService } from '../application/usecases/find-all-address/find-all-address.service'
import { GetAddressService } from '../application/usecases/get-address/get-address.service'
import { UpdateAddressService } from '../application/usecases/update-address/update-address.service'
import { AddressController } from './address.controller'
import { AddressRepository } from './database/repository/address.repository'

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AddressController],
  providers: [
    AddressRepository,
    CreateAddressService.UseCase,
    GetAddressService.UseCase,
    FindAllAddressService.UseCase,
    UpdateAddressService.UseCase,
    DeleteAddressService.UseCase,
  ],
})
export class AddressModule {}
