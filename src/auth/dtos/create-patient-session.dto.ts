import { PatientEntity } from '@/patient/entities/patient.entity'

export type CreatePatientSessionUseCaseInput = {
  phone: string
  dob: Date
}

export type CreatePatientSessionUseCaseOutput = {
  account: PatientEntity
  accessToken: string
  refreshToken: string
}
