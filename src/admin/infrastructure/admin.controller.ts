import { AuthService } from '@/auth/auth.service'
import { Body, Controller, Post } from '@nestjs/common'
import { LoginAdminService } from '../application/usecases/login-admin/login-admin.service'
import { LoginAdminDto } from './dtos/login-admin.dto'

@Controller('admin')
export class AdminController {
  constructor(
    private readonly loginAdminService: LoginAdminService.UseCase,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginAdminDto) {
    const { password, ...restOutput } =
      await this.loginAdminService.execute(loginUserDto)
    const tokenJwt = await this.authService.generateJwt(restOutput.adminId)

    return {
      data: {
        ...restOutput,
      },
      ...tokenJwt,
    }
  }
}
