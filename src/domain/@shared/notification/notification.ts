// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type NotificationError = {
  message: string
  context: string
}

export class Notification {
  private readonly errors: NotificationError[] = []

  addError (error: NotificationError): void {
    this.errors.push(error)
  }

  messages (context?: string): string {
    const messages = this.errors
      .filter(error => context ? error.context === context : true)
      .map(error => `${error.context}: ${error.message}`)
    return messages.join(',')
  }

  hasErrors (): boolean {
    return this.errors.length > 0
  }
}
