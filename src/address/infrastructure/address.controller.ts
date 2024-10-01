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
import { CreateAddressService } from '../application/usecases/create-address/create-address.service'
import { DeleteAddressService } from '../application/usecases/delete-address/delete-address.service'
import { FindAllAddressService } from '../application/usecases/find-all-address/find-all-address.service'
import { GetAddressService } from '../application/usecases/get-address/get-address.service'
import { UpdateAddressService } from '../application/usecases/update-address/update-address.service'
import { CreateAddressDto } from './dtos/create-address.dto'
import { UpdateAddressDto } from './dtos/update-address.dto'

@Controller('address')
export class AddressController {
  constructor(
    private readonly createAddressService: CreateAddressService.UseCase,
    private readonly getAddressService: GetAddressService.UseCase,
    private readonly findAllAddressService: FindAllAddressService.UseCase,
    private readonly updateAddressService: UpdateAddressService.UseCase,
    private readonly deleteAddressService: DeleteAddressService.UseCase,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createAddressDto: CreateAddressDto,
    @Headers('Authorization') authorization: string,
  ) {
    const extractUserId = await this.authService.extractPayload(authorization)

    const createAddress = await this.createAddressService.execute({
      ...createAddressDto,
      userId: extractUserId,
    })

    return {
      data: createAddress,
    }
  }

  @Get(':userId')
  async findAll(@Param(':userId') userId: string) {
    const findAllAddress = await this.findAllAddressService.execute({ userId })

    return {
      data: findAllAddress,
    }
  }

  @Get(':addressId')
  async findOne(@Param('addressId') addressId: string) {
    const getAddress = await this.getAddressService.execute({ addressId })

    return {
      data: getAddress,
    }
  }

  @UseGuards(AuthGuard)
  @Patch()
  async update(
    @Body() updateAddressDto: UpdateAddressDto,
    @Headers('Authorization') authorization: string,
  ) {
    const extractUserId = await this.authService.extractPayload(authorization)
    const updateAddress = await this.updateAddressService.execute({
      userId: extractUserId,
      ...updateAddressDto,
    })

    return {
      data: updateAddress,
    }
  }

  @HttpCode(204)
  @UseGuards(AuthGuard)
  @Delete(':addressId')
  async remove(
    @Param('addressId') addressId: string,
    @Headers('Authorization') authorization: string,
  ) {
    const extractUserId = await this.authService.extractPayload(authorization)
    await this.deleteAddressService.execute({
      addressId,
      userId: extractUserId,
    })
  }
}
