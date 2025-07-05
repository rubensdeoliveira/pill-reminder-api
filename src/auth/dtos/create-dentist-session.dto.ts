import { DentistEntity } from '@/dentist/entities/dentist.entity'

export type CreateDentistSessionUseCaseInput = {
  email: string
  password: string
}

export type CreateDentistSessionUseCaseOutput = {
  account: DentistEntity
  accessToken: string
  refreshToken: string
}
