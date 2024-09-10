import { Module } from '@nestjs/common'
import { HashProviderService } from './hash-provider.service'

@Module({
  providers: [HashProviderService],
  exports: [HashProviderService],
})
export class HashProviderModule {}
