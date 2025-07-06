import { DentistEntity } from '../entities/dentist.entity'

export type DentistOutput = Pick<
  DentistEntity,
  'id' | 'name' | 'email' | 'phone' | 'dob' | 'role'
>
