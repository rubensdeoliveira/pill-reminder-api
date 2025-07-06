import { PatientEntity } from '@/patient/entities/patient.entity'

export type CreatePatientUseCaseInput = {
  name: string
  phone: string
  dob: Date
}

export type CreatePatientUseCaseOutput = PatientEntity
