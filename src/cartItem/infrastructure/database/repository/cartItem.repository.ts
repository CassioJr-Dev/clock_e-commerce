import { CartEntity } from '@/cart/model/cart.entity'
import { CartItemEntity } from '@/cartItem/model/cartItem.entity'
import { PrismaService } from '@/shared/database/database.service'
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

@Injectable()
export class CartItemRepository {
  constructor(private prismaService: PrismaService) { }

  async addItemToCart(
    item: CartItemEntity,
    userId: string,
  ): Promise<CartItemEntity> {
    const cartExists = await this.cartExists(item.cartId, userId)

    const productExists = await this.prismaService.product.findUnique({
      where: {
        productId: item.productId,
      },
    })

    if (!productExists) {
      throw new NotFoundException('Produto não encontrado')
    }

    if (!cartExists) {
      throw new NotFoundException('Carrinho não encontrado')
    }

    const itemExists = await this.prismaService.cartItem.findMany({
      where: { productId: item.productId, cartId: item.cartId },
    })

    if (itemExists.length) {
      throw new ConflictException('O produto já existe no carrinho')
    }

    const addItem = await this.prismaService.cartItem.create({
      data: item,
    })

    return addItem
  }

  async removeItemFromCart(
    itemId: string,
    cartId: string,
    userId: string,
  ): Promise<void> {
    await this.cartExists(cartId, userId)

    await this.itemExists(itemId, cartId)

    await this.prismaService.cartItem.delete({
      where: { itemId, cartId },
    })
  }

  async updateQuantity(
    itemEntity: Omit<CartItemEntity, 'created_at'>,
    userId: string,
  ): Promise<CartItemEntity> {
    await this.cartExists(itemEntity.cartId, userId)

    await this.itemExists(itemEntity.itemId, itemEntity.cartId)

    const updateItem = await this.prismaService.cartItem.update({
      where: { itemId: itemEntity.itemId, cartId: itemEntity.cartId },
      data: {
        quantity: itemEntity.quantity
      },
    })

    return updateItem
  }

  async findAll(cartId: string, userId: string): Promise<CartItemEntity[]> {
    await this.cartExists(cartId, userId)

    const cartItems = await this.prismaService.cartItem.findMany({
      where: {
        cartId,
      },
      include: {
        product: true,
      },
    })

    return cartItems
  }

  async findItem(itemId: string, cartId: string): Promise<CartItemEntity> {
    return this.itemExists(itemId, cartId)
  }

  private async itemExists(
    itemId: string,
    cartId: string,
  ): Promise<CartItemEntity> {
    const findItem = await this.prismaService.cartItem.findUnique({
      where: { itemId, cartId },
    })

    if (!findItem) {
      throw new NotFoundException('Carrinho não encontrado')
    }

    return findItem
  }

  private async cartExists(
    cartId: string,
    userId: string,
  ): Promise<CartEntity> {
    const findCart = await this.prismaService.cart.findUnique({
      where: { cartId, userId },
    })

    if (!findCart) {
      throw new NotFoundException('Carrinho não encontrado')
    }

    return findCart
  }
}
