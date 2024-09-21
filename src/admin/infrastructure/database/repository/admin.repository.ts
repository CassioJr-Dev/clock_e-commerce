import { AdminEntity } from '@/admin/model/admin.entity'
import { PrismaService } from '@/shared/database/database.service'
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

@Injectable()
export class AdminRepository {
  constructor(private prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<AdminEntity> {
    try {
      return await this.prismaService.admin.findUnique({
        where: { email },
      })
    } catch {
      throw new NotFoundException(
        `Admin não encontrado usando o email: ${email}`,
      )
    }
  }

  async emailExists(email: string): Promise<void> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    })
    if (user) {
      throw new ConflictException(`Endereço de e-mail já utilizado`)
    }
  }

  async insert(entity: AdminEntity): Promise<AdminEntity> {
    return this.prismaService.admin.create({
      data: entity,
    })
  }

  async findById(adminId: string): Promise<AdminEntity> {
    return this._get(adminId)
  }

  async findAll(): Promise<AdminEntity[]> {
    return this.prismaService.admin.findMany()
  }

  async update(entity: AdminEntity): Promise<AdminEntity> {
    await this._get(entity.adminId)

    return await this.prismaService.admin.update({
      data: entity,
      where: {
        adminId: entity.adminId,
      },
    })
  }

  async delete(userId: string): Promise<void> {
    await this._get(userId)
    await this.prismaService.user.delete({
      where: { userId },
    })
  }

  protected async _get(adminId: string): Promise<AdminEntity> {
    try {
      return await this.prismaService.admin.findUniqueOrThrow({
        where: { adminId },
      })
    } catch {
      throw new NotFoundException(
        `Admin não encontrado usando o ID: ${adminId}`,
      )
    }
  }
}
