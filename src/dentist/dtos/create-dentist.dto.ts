import { DentistEntity } from '@/dentist/entities/dentist.entity'

export type CreateDentistUseCaseInput = {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  dob: Date
}

export type CreateDentistUseCaseOutput = DentistEntity
