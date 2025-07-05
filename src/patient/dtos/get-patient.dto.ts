import { PatientEntity } from '@/patient/entities/patient.entity'

export type GetPatientUseCaseInput = { accountId: string }

export type GetPatientUseCaseOutput = PatientEntity
