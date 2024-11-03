export class Book {
  constructor(
    public id: number,
    public name: string,
    public number: number,
    public author: string,
    public gender: string,
    public quantity: number,
    public isAvailable: boolean = true
  ) {}

  reduceQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    } else {
      throw new Error("No book available to allocate.");
    }
  }

  increaseQuantity() {
    this.quantity++;
  }
}
