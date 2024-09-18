import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

export type GenerateJwtProps = {
  accessToken: string
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateJwt(userId: string): Promise<GenerateJwtProps> {
    const accessToken = await this.jwtService.signAsync({ id: userId }, {})
    return { accessToken }
  }

  async verifyJwt(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    })
  }

  async extractPayload(tokenJwt: string): Promise<string> {
    const [type, token] = tokenJwt.split(' ') ?? []

    if (type === 'Bearer') {
      return this.jwtService.decode(token).id
    }

    return undefined
  }
}
