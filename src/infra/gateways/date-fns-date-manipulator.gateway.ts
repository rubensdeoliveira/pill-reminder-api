import { Injectable } from '@nestjs/common'
import { addDays } from 'date-fns'

export type AddDaysInput = {
  date: Date
  days: number
}

@Injectable()
class DateFnsDateManipulatorGateway {
  constructor() {}

  addDays({ date, days }: AddDaysInput): Date {
    const dateWithAddedDays = addDays(date, days)
    return dateWithAddedDays
  }
}

export { DateFnsDateManipulatorGateway as DateManipulatorGateway }
