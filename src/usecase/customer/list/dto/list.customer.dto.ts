// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InputListCustomerDto {}

interface Customer {
  id: number
  name: string
  address: {
    street: string
    number: number
    zip: string
    city: string
  }
}

export interface OutputListCustomerDto {
  customers: Customer[]
}
