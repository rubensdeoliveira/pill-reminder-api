import { PatientOutput } from '@/patient/dtos/patient.dto'

export type CreatePatientSessionUseCaseInput = {
  phone: string
  dob: Date
}

export type CreatePatientSessionUseCaseOutput = {
  patient: PatientOutput
  accessToken: string
  refreshToken: string
}
