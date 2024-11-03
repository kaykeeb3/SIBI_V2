export class Loan {
  constructor(
    public id: number,
    public name: string,
    public seriesCourse: string,
    public startDate: Date,
    public returnDate: Date,
    public returned: boolean,
    public bookId: number
  ) {}
}
