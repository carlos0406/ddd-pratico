export interface ProductInterface {
  get id(): number
  get name(): string
  get price(): number
  changeName: (name: string) => void
  changePrice: (price: number) => void
}
