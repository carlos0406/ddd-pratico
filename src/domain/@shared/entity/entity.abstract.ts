import { Notification } from './../notification/notification'
export class AbstractClassEntity {
  protected id: string
  protected notification: Notification
  constructor () {
    this.notification = new Notification()
  }

  // get id (): string { return this.id }
  // set id (value: string) {
  //   this.id = value
  // }
}
