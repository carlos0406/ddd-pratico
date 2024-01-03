export interface ProductInterface {
  get id(): string
  set id(value: string)
  get name(): string
  get price(): number
  changeName: (name: string) => void
  changePrice: (price: number) => void
}
