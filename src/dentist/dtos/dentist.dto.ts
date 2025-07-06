import { AccountRoleType } from '@/auth/gateways/jwt.gateway'

export type DentistInput = {
  name: string
  email: string
  phone: string
  dob: Date
  confirmPassword: string
  password: string
}

export type DentistOutput = {
  id: string
  name: string
  email: string
  phone: string
  dob: Date
  role: AccountRoleType
}
