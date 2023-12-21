export interface InputFindCustomerDto {
  id: number
}

export interface OutputFindCustomerDto {
  id: number
  name: string
  address: {
    street: string
    city: string
    number: number
    zip: string
  }
}
