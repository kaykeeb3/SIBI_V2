export class User {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public name: string,
    public institution: string,
    public limit: number,
    public role: string,
    public phone?: string | null,
    public profilePicture?: string | null,
    public createdAt?: Date
  ) {}
}
