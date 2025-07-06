export abstract class DateManipulatorGateway {
  abstract addDays(input: AddDaysInput): AddDaysOutput
}

export type AddDaysInput = {
  date: Date
  days: number
}

export type AddDaysOutput = Date
