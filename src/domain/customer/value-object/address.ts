// objeto de valor é uma forma de poder fugir de tipos primitivos e criar um tipo mais complexo com validação propria que assim como foi dito na classe customer
// entidade precisa se auto validar para manter a consisência dos dados
// lembrando que a modelagem das entidades não precisa ser igual as de banco de dados
export class Address {
  private _street: string = ''

  _number: number = 0
  _zip: string = ''
  _city: string = ''

  // Getter e Setter para _street

  constructor (_street: string, _number: number, _zip: string, _city: string) {
    this._street = _street
    this._number = _number
    this._zip = _zip
    this._city = _city
  }

  validate (): boolean {
    if (this._street.length < 3) {
      return false
    }
    if (this._number <= 0) {
      return false
    }

    if (this._zip.length < 8) {
      return false
    }

    if (this._city.length < 3) {
      return false
    }
    return true
  }

  get street (): string {
    return this._street
  }

  set street (value: string) {
    this._street = value
  }

  get number (): number {
    return this._number
  }

  get zip (): string {
    return this._zip
  }

  get city (): string {
    return this._city
  }
}
