export type PatientInput = {
  name: string
  phone: string
  dob: Date
}

export type PatientOutput = {
  id: string
  name: string
  email: string | null
  phone: string | null
  dob: Date | null
  role: string
}
