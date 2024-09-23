import { CartEntity } from '@/cart/model/cart.entity'
import { PrismaService } from '@/shared/database/database.service'
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

@Injectable()
export class CartRepository {
  constructor(private prismaService: PrismaService) {}

  async createCart(cart: CartEntity): Promise<CartEntity> {
    const cartExists = await this.cartExists(cart.cartId, cart.userId)
    if (cartExists) {
      throw new ConflictException('O carrinho já existe')
    }
    const createCart = await this.prismaService.cart.create({
      data: cart,
    })

    return createCart
  }

  async findCart(cartId: string, userId: string): Promise<CartEntity> {
    const findCart = await this.cartExists(cartId, userId)

    if (!findCart) {
      throw new NotFoundException('Carrinho não encontrado')
    }

    return findCart
  }

  async deleteCart(cartId: string, userId: string): Promise<void> {
    const cartExists = await this.cartExists(userId, cartId)

    if (!cartExists) {
      throw new NotFoundException('Carrinho não encontrado')
    }
    await this.prismaService.cart.delete({
      where: { cartId, userId },
    })
  }

  private async cartExists(
    cartId: string,
    userId: string,
  ): Promise<CartEntity> {
    const findCart = await this.prismaService.cart.findUnique({
      where: { cartId, userId },
    })

    return findCart
  }
}
