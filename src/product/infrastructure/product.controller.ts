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
  Query,
  UseGuards,
} from '@nestjs/common'
import { CreateProductService } from '../application/usecases/create-product/create-product.service'
import { DeleteProductService } from '../application/usecases/delete-product/delete-product.service'
import { GetProductService } from '../application/usecases/get-product/get-product.service'
import { SearchProductService } from '../application/usecases/search-product/search-product.service'
import { UpdateProductService } from '../application/usecases/update-product/update-product.service'
import { CreateProductDto } from './dtos/create-product.dto'
import { SearchProductsDto } from './dtos/search-product.dto'
import { UpdateProductDto } from './dtos/update-product.dto'

@Controller('product')
export class ProductController {
  constructor(
    private readonly createProductService: CreateProductService.UseCase,
    private readonly getProductService: GetProductService.UseCase,
    private readonly updateProductService: UpdateProductService.UseCase,
    private readonly searchProductService: SearchProductService.UseCase,
    private readonly deleteProductService: DeleteProductService.UseCase,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Headers('Authorization') authorization: string,
  ) {
    const extractUserId = await this.authService.extractPayload(authorization)

    const createProduct = await this.createProductService.execute({
      ...createProductDto,
      adminId: extractUserId,
    })

    return {
      data: createProduct,
    }
  }

  @Get()
  async search(@Query() searchParams: SearchProductsDto) {
    const ouput = await this.searchProductService.execute(searchParams)
    return ouput
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const getProduct = await this.getProductService.execute({ productId: id })
    return {
      data: getProduct,
    }
  }

  @UseGuards(AuthGuard)
  @Patch()
  async update(
    @Body() updateProductDto: UpdateProductDto,
    @Headers('Authorization') authorization: string,
  ) {
    const extractAdminId = await this.authService.extractPayload(authorization)
    const updateUser = await this.updateProductService.execute({
      adminId: extractAdminId,
      ...updateProductDto,
    })
    return {
      data: updateUser,
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Delete()
  async remove(
    @Param('id') id: string,
    @Headers('Authorization') authorization: string,
  ) {
    const extractAdminId = await this.authService.extractPayload(authorization)
    await this.deleteProductService.execute({
      productId: id,
      adminId: extractAdminId,
    })
  }
}
