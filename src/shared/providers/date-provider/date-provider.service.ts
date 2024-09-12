export class DateProviderService {
  static toDate(): Date {
    const newDate = new Date()
    newDate.setUTCHours(newDate.getUTCHours() - 3)

    return newDate
  }
}
