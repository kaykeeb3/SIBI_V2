export class Schedule {
  constructor(
    public id: number,
    public name: string,
    public quantity: number,
    public startDate: Date,
    public returnDate: Date,
    public weekDay: string,
    public equipmentId: number,
    public returned: boolean,
    public type?: string
  ) {}
}
