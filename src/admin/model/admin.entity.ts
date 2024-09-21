import { Admin } from '@prisma/client'

export class AdminEntity implements Admin {
  adminId: string
  name: string
  email: string
  password: string
  created_at: Date
}
