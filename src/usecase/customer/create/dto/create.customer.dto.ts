export interface InputCreateCustomerDto {
  name: string
  address: {
    street: string
    city: string
    number: number
    zip: string
  }
}

export interface OutputCreateCustomerDto {
  id: number
  name: string
  address: {
    street: string
    city: string
    number: number
    zip: string
  }
}
