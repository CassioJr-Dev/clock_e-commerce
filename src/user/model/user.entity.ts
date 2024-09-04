import { User } from '@prisma/client'

export class UserEntity implements User {
  userId: string
  name: string
  email: string
  password: string
  telephone: string
  created_at: Date
}
