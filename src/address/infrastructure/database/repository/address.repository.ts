import { AddressEntity } from '@/address/model/address.entity'
import { PrismaService } from '@/shared/database/database.service'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class AddressRepository {
  constructor(private prismaService: PrismaService) {}

  async insert(entity: AddressEntity): Promise<AddressEntity> {
    return this.prismaService.address.create({
      data: entity,
    })
  }

  async findById(addressId: string): Promise<AddressEntity> {
    return this._get(addressId)
  }

  async findAll(userId: string): Promise<AddressEntity[]> {
    return this.prismaService.address.findMany({
      where: { userId },
    })
  }

  async update(entity: AddressEntity): Promise<AddressEntity> {
    await this._get(entity.addressId)

    return await this.prismaService.address.update({
      data: entity,
      where: {
        addressId: entity.addressId,
      },
    })
  }

  async delete(addressId: string): Promise<void> {
    await this._get(addressId)
    await this.prismaService.address.delete({
      where: { addressId },
    })
  }

  protected async _get(addressId: string): Promise<AddressEntity> {
    try {
      return await this.prismaService.address.findUniqueOrThrow({
        where: { addressId },
      })
    } catch {
      throw new NotFoundException(
        `Endereço não encontrado usando o ID: ${addressId}`,
      )
    }
  }
}
