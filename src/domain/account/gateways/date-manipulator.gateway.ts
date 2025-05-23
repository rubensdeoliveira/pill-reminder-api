export type AddDaysParams = {
  date: Date
  days: number
}

export abstract class DateManipulatorGateway {
  abstract addDays(params: AddDaysParams): Date
}
