export type AddDaysInput = {
  date: Date
  days: number
}

export abstract class DateManipulatorGateway {
  abstract addDays({ date, days }: AddDaysInput): Date
}
