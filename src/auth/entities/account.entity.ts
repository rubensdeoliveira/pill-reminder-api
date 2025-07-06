import { AccountRoleType } from '@/auth/gateways/jwt.gateway'

export type AccountEntity = {
  id: string
  name: string
  email: string | null
  password: string | null
  phone: string | null
  dob: Date | null
  role: AccountRoleType
  createdAt?: Date | null
  updatedAt?: Date | null
}
