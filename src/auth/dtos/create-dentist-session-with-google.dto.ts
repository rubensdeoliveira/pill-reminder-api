import { DentistOutput } from '@/dentist/dtos/dentist.dto'

export type CreateDentistSessionWithGoogleUseCaseInput = {
  email: string
  name: string
}

export type CreateDentistSessionWithGoogleUseCaseOutput = {
  dentist: DentistOutput
  accessToken: string
  refreshToken: string
}
