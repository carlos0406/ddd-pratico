// entidade sempre deve representar o estado correto e atual do elemento
// garantir consistência dos dados
// regra de negócio
// construtor deve conter todas as propriedades da entidade devidamente preenchidas, exemplo pessoa deve sempre conter um nome
// entidade precisa se auto validar para manter a consisência dos dados
// diferenciar entidade focada em negocio de entidade focada em persistencia "Model"

import { AbstractClassEntity } from '../../@shared/entity/entity.abstract'
import NotificationError from '../../@shared/notification/notification.error'
import CustumerValidatorFactory from '../factory/custumer.validator.factory'
import { type Address } from '../value-object/address'

export class Customer extends AbstractClassEntity {
  private _name: string
  private _address!: Address
  private _enable: boolean = false
  private _rewardPoints: number = 0

  constructor (id: string, name: string) {
    super()
    this._id = id
    this._name = name
    this.validate()
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErros())
    }
  }

  get name (): string {
    return this._name
  }

  // padrão de classe anemica
  set name (name: string) {
    this._name = name
  }

  // regra de negócio modelagem rica de um dominio
  changeName (name: string): void {
    this._name = name
  }

  get rewardPoints (): number {
    return this._rewardPoints
  }

  addRewardPoints (points: number): void {
    this._rewardPoints += points
  }

  validate (): void {
    CustumerValidatorFactory.create().validate(this)
  }

  active (): void {
    if (this.address === undefined) {
      throw new Error('Endereço é obrigatório para ativação')
    } else {
      this._enable = true
    }
  }

  desactive (): void {
    this._enable = false
  }

  isActive (): boolean {
    return this._enable
  }

  get address (): Address {
    return this._address
  }

  set address (address: Address) {
    this._address = address
  }
}
