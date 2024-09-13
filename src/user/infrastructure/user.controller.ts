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
    const output = await this.createUserService.execute(createUserDto)
    const tokenJwt = await this.authService.generateJwt(output.userId)

    return {
      ...tokenJwt,
      ...output,
    }
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Headers('Authorization') authorization: string,
  ) {
    const output = await this.loginUserService.execute(loginUserDto)
    const tokenJwt = await this.authService.generateJwt(output.userId)

    return {
      ...tokenJwt,
      ...output,
    }
  }

  @Get()
  async findAll() {
    return this.findAllUsersService.execute()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.GetUserService.execute({ userId: id })
  }

  @UseGuards(AuthGuard)
  @Patch()
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Headers('Authorization') authorization: string,
  ) {
    const extractUserId = await this.authService.extractPayload(authorization)
    return this.updateUserService.execute({
      userId: extractUserId,
      ...updateUserDto,
    })
  }

  @HttpCode(204)
  @UseGuards(AuthGuard)
  @Delete()
  async remove(@Headers('Authorization') authorization: string) {
    const extractUserId = await this.authService.extractPayload(authorization)
    await this.deleteUserService.execute({ userId: extractUserId })
  }
}
