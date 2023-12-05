import { type EventInterface } from './events.interface'

export interface EventHandlerInterface<T extends EventInterface=EventInterface > {
  handle: (event: T) => void
}
