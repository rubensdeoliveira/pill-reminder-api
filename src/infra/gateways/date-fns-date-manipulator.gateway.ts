import { Injectable } from '@nestjs/common'
import { addDays } from 'date-fns'

import {
  AddDaysParams,
  DateManipulatorGateway,
} from '@/domain/account/gateways/date-manipulator.gateway'

@Injectable()
export class DateFnsDateManipulatorGateway implements DateManipulatorGateway {
  constructor() {}

  addDays({ date, days }: AddDaysParams): Date {
    const dateWithAddedDays = addDays(date, days)
    return dateWithAddedDays
  }
}
