import { PatientEntity } from '@/patient/entities/patient.entity'

export type CreatePatientUseCaseInput = {
  name: string
  email: string
  phone: string
  dob: Date
}

export type CreatePatientUseCaseOutput = PatientEntity
