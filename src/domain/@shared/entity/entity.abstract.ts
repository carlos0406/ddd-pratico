import { Notification } from './../notification/notification'
export class AbstractClassEntity {
  protected _id: string
  protected notification: Notification
  constructor () {
    this.notification = new Notification()
  }

  get id (): string { return this._id }
  set id (id: string) {
    this._id = id
  }
}
