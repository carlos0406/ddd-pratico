// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InputListProductDto {}

interface Product {
  id: number
  name: string
  price: number
}

export interface OutputListProductDto {
  products: Product[]
}
