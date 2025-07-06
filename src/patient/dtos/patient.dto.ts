import { PatientEntity } from '../entities/patient.entity'

export type PatientOutput = Pick<
  PatientEntity,
  'id' | 'name' | 'email' | 'phone' | 'dob' | 'role'
>
