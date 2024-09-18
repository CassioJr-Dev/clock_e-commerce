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
import { CreateUserService } from '../application/usecases/create-user/create-user.service'
import { DeleteUserService } from '../application/usecases/delete-user/delete-user.service'
import { FindAllUsersService } from '../application/usecases/find-all-users/find-all-users.service'
import { GetUserService } from '../application/usecases/get-user/get-user.service'
import { LoginUserService } from '../application/usecases/login-user/login-user.service'
import { UpdateUserService } from '../application/usecases/update-user/update-user.service'
import { CreateUserDto } from './dtos/create-user.dto'
import { LoginUserDto } from './dtos/login-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService.UseCase,
    private readonly GetUserService: GetUserService.UseCase,
    private readonly updateUserService: UpdateUserService.UseCase,
    private readonly findAllUsersService: FindAllUsersService.UseCase,
    private readonly deleteUserService: DeleteUserService.UseCase,
    private readonly loginUserService: LoginUserService.UseCase,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const { password, ...restOutput } =
      await this.createUserService.execute(createUserDto)
    const tokenJwt = await this.authService.generateJwt(restOutput.userId)

    return {
      data: {
        ...restOutput,
      },
      ...tokenJwt,
    }
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Headers('Authorization') authorization: string,
  ) {
    const { password, ...restOutput } =
      await this.loginUserService.execute(loginUserDto)
    const tokenJwt = await this.authService.generateJwt(restOutput.userId)

    return {
      data: {
        ...restOutput,
      },
      ...tokenJwt,
    }
  }

  @Get()
  async findAll() {
    const find = await this.findAllUsersService.execute()

    for (const index in find) {
      delete find[index].password
    }

    return {
      data: find,
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const getUser = await this.GetUserService.execute({ userId: id })
    delete getUser.password
    return {
      data: getUser,
    }
  }

  @UseGuards(AuthGuard)
  @Patch()
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Headers('Authorization') authorization: string,
  ) {
    const extractUserId = await this.authService.extractPayload(authorization)
    const updateUser = await this.updateUserService.execute({
      userId: extractUserId,
      ...updateUserDto,
    })
    delete updateUser.password
    return {
      data: updateUser,
    }
  }

  @HttpCode(204)
  @UseGuards(AuthGuard)
  @Delete()
  async remove(@Headers('Authorization') authorization: string) {
    const extractUserId = await this.authService.extractPayload(authorization)
    await this.deleteUserService.execute({ userId: extractUserId })
  }
}
