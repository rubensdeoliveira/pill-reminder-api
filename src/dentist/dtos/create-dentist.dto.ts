import { DentistOutput } from '@/dentist/dtos/dentist.dto'
import { DentistEntity } from '@/dentist/entities/dentist.entity'

export type CreateDentistUseCaseInput = Pick<
  DentistEntity,
  'name' | 'phone' | 'dob'
> & {
  confirmPassword: string
  email: string
  password: string
}

export type CreateDentistUseCaseOutput = DentistOutput
