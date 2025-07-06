import { Injectable } from '@nestjs/common'
import { addDays } from 'date-fns'

import {
  AddDaysInput,
  AddDaysOutput,
  DateManipulatorGateway,
} from '@/_shared/gateways/date-manipulator.gateway'

@Injectable()
export class DateManipulatorDateFnsGateway implements DateManipulatorGateway {
  constructor() {}

  addDays({ date, days }: AddDaysInput): AddDaysOutput {
    const dateWithAddedDays = addDays(date, days)
    return dateWithAddedDays
  }
}
