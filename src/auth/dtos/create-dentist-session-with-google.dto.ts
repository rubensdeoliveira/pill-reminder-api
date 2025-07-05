import { DentistEntity } from '@/dentist/entities/dentist.entity'

export type CreateDentistSessionWithGoogleUseCaseInput = {
  email: string
  name: string
}

export type CreateDentistSessionWithGoogleUseCaseOutput = {
  account: DentistEntity
  accessToken: string
  refreshToken: string
}
