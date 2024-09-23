import { AuthModule } from '@/auth/auth.module'
import { DatabaseModule } from '@/shared/database/database.module'
import { HashProviderModule } from '@/shared/providers/hash-provider/hash-provider.module'
import { Module } from '@nestjs/common'
import { LoginAdminService } from '../application/usecases/login-admin/login-admin.service'
import { AdminController } from './admin.controller'
import { AdminRepository } from './database/repository/admin.repository'

@Module({
  imports: [DatabaseModule, HashProviderModule, AuthModule],
  controllers: [AdminController],
  providers: [AdminRepository, LoginAdminService.UseCase],
})
export class AdminModule {}
