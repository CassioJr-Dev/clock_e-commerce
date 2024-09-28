import { AuthGuard } from '@/auth/auth.guard'
import { AuthService } from '@/auth/auth.service'
import {
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { CreateCartService } from '../application/usecases/create-cart/create-cart.service'
import { DeleteCartService } from '../application/usecases/delete-cart/delete-cart.service'
import { GetCartService } from '../application/usecases/get-cart/get-cart.service'

@Controller('cart')
export class CartController {
  constructor(
    private readonly createCartService: CreateCartService.UseCase,
    private readonly getCartService: GetCartService.UseCase,
    private readonly deleteCartService: DeleteCartService.UseCase,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async createCart(@Headers('Authorization') authorization: string) {
    const extractUserId = await this.authService.extractPayload(authorization)
    const createCart = await this.createCartService.execute({
      userId: extractUserId,
    })
    return createCart
  }

  @UseGuards(AuthGuard)
  @Get()
  async findCart(@Headers('Authorization') authorization: string) {
    const extractUserId = await this.authService.extractPayload(authorization)
    const findCart = await this.getCartService.execute({
      userId: extractUserId,
    })

    return findCart
  }

  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Delete(':id')
  async removeCart(
    @Param('id') cartId: string,
    @Headers('Authorization') authorization: string,
  ) {
    const extractUserId = await this.authService.extractPayload(authorization)
    await this.deleteCartService.execute({ cartId, userId: extractUserId })
  }
}
