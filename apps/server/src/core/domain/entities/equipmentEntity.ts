export class Equipment {
  constructor(
    public id: number,
    public name: string,
    public type: string,
    public quantity: number,
    public isAvailable: boolean = true
  ) {}

  reduceQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    } else {
      throw new Error("No equipment available to allocate.");
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  checkAvailability(): boolean {
    return this.quantity > 0;
  }
}
