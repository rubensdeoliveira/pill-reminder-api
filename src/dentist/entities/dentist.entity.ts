import { AccountRoleType } from '@/_shared/gateways/jwt.gateway'

export type DentistEntity = {
  id: string
  name: string
  email: string | null
  phone: string | null
  dob: Date | null
  role: AccountRoleType
}
