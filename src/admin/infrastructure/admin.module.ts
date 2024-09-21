import { DatabaseModule } from '@/shared/database/database.module'
import { HashProviderModule } from '@/shared/providers/hash-provider/hash-provider.module'
import { Module } from '@nestjs/common'
import { LoginAdminService } from '../application/usecases/login-admin/login-admin.service'
import { AdminController } from './admin.controller'

@Module({
  imports: [DatabaseModule, HashProviderModule],
  controllers: [AdminController],
  providers: [LoginAdminService.UseCase],
})
export class AdminModule {}
