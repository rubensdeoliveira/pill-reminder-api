import { PatientOutput } from '@/patient/dtos/patient.dto'

export type GetPatientUseCaseInput = { accountId: string }

export type GetPatientUseCaseOutput = PatientOutput
