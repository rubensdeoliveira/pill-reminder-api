import { PatientEntity } from '@/patient/entities/patient.entity'

export type CreatePatientRepositoryInput = {
  name: string
  phone: string | null
  dob: Date | null
  password: string | null
}
type PatientEntityWithPassword = PatientEntity & {
  password: string | null
}
export type CreatePatientRepositoryOutput = PatientEntity

export type FindByPhoneAndDobPatientRepositoryInput = {
  phone: string
  dob: Date
}
export type FindByPhoneAndDobPatientRepositoryOutput =
  PatientEntityWithPassword | null

export type FindByIdPatientRepositoryInput = {
  id: string
}
export type FindByIdPatientRepositoryOutput = PatientEntity | null

export abstract class PatientRepository {
  abstract create(
    data: CreatePatientRepositoryInput,
  ): Promise<CreatePatientRepositoryOutput>

  abstract findByPhoneAndDob(
    data: FindByPhoneAndDobPatientRepositoryInput,
  ): Promise<FindByPhoneAndDobPatientRepositoryOutput>

  abstract findById(
    data: FindByIdPatientRepositoryInput,
  ): Promise<FindByIdPatientRepositoryOutput>
}
