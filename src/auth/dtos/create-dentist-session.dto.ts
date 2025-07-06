import { DentistOutput } from '@/dentist/dtos/dentist.dto'

export type CreateDentistSessionUseCaseInput = {
  email: string
  password: string
}

export type CreateDentistSessionUseCaseOutput = {
  dentist: DentistOutput
  accessToken: string
  refreshToken: string
}
