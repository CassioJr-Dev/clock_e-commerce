import { PrismaService } from '@/shared/database/database.service'
import { UserEntity } from '@/user/model/user.entity'
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      return await this.prismaService.user.findUnique({
        where: { email },
      })
    } catch {
      throw new NotFoundException(
        `Usuário não encontrado usando o email: ${email}`,
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

  async findByTelephone(telephone: string): Promise<UserEntity> {
    try {
      return await this.prismaService.user.findUnique({
        where: { telephone },
      })
    } catch {
      throw new NotFoundException(
        `Usuário não encontrado usando o telefone: ${telephone}`,
      )
    }
  }

  async telephoneExists(telephone: string): Promise<void> {
    const user = await this.prismaService.user.findUnique({
      where: { telephone },
    })
    if (user) {
      throw new ConflictException(`Número de telefone já utilizado`)
    }
  }

  async insert(entity: UserEntity): Promise<UserEntity> {
    return this.prismaService.user.create({
      data: entity,
    })
  }

  async findById(userId: string): Promise<UserEntity> {
    return this._get(userId)
  }

  async findAll(): Promise<UserEntity[]> {
    return this.prismaService.user.findMany()
  }

  async update(entity: UserEntity): Promise<UserEntity> {
    await this._get(entity.userId)

    return await this.prismaService.user.update({
      data: entity,
      where: {
        userId: entity.userId,
      },
    })
  }

  async delete(userId: string): Promise<void> {
    await this._get(userId)
    await this.prismaService.user.delete({
      where: { userId },
    })
  }

  protected async _get(userId: string): Promise<UserEntity> {
    try {
      return await this.prismaService.user.findUnique({
        where: { userId },
      })
    } catch {
      throw new NotFoundException(
        `Usuário não encontrado usando o ID: ${userId}`,
      )
    }
  }
}
