import { AuthGuard } from '@/auth/auth.guard'
import { AuthService } from '@/auth/auth.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AddItemService } from '../application/usecases/addItem-cart/addItem.service'
import { DeleteItemService } from '../application/usecases/deleteItem-cart/deleteItem.service'
import { FindAllItemsService } from '../application/usecases/findAll-cart/findAll.service'
import { GetItemService } from '../application/usecases/getItem-cart/getItem.service'
import { UpdateItemService } from '../application/usecases/updateQuantity-cart/updateQuantity.service'
import { AddItemDto } from './dtos/addItem-cart.dto'
import { UpdateQuantityDto } from './dtos/updateQuantityItem-cart.dto'

@Controller('cartItem')
export class CartItemController {
  constructor(
    private readonly addItemService: AddItemService.UseCase,
    private readonly getItemService: GetItemService.UseCase,
    private readonly findAllItemsService: FindAllItemsService.UseCase,
    private readonly updateItemService: UpdateItemService.UseCase,
    private readonly deleteItemService: DeleteItemService.UseCase,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async AddItem(
    @Body() addItemDto: AddItemDto,
    @Headers('Authorization') authorization: string,
  ) {
    const extractUserId = await this.authService.extractPayload(authorization)

    const addItem = await this.addItemService.execute({
      ...addItemDto,
      userId: extractUserId,
    })

    return {
      data: addItem,
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findAll(
    @Param('id') id: string,
    @Headers('Authorization') authorization: string,
  ) {
    const extractUserId = await this.authService.extractPayload(authorization)
    const ouput = await this.findAllItemsService.execute({
      cartId: id,
      userId: extractUserId,
    })
    return ouput
  }

  @Get(':cartId/:itemId')
  async findOne(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
  ) {
    const getProduct = await this.getItemService.execute({ cartId, itemId })
    return {
      data: getProduct,
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':cartId/:itemId')
  async updateQuantity(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
    @Body() updateQuantityDto: UpdateQuantityDto,
    @Headers('Authorization') authorization: string,
  ) {
    const extractUserId = await this.authService.extractPayload(authorization)
    const updateQuantity = await this.updateItemService.execute({
      ...updateQuantityDto,
      userId: extractUserId,
      itemId,
      cartId,
    })
    return {
      data: updateQuantity,
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Delete(':cartId/:itemId')
  async remove(
    @Param('cartId') cartId: string,
    @Param('itemId') itemId: string,
    @Headers('Authorization') authorization: string,
  ) {
    const extractUserId = await this.authService.extractPayload(authorization)
    await this.deleteItemService.execute({
      cartId,
      itemId,
      userId: extractUserId,
    })
  }
}
