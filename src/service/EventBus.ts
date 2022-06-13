// eslint-disable-next-line no-shadow
export enum EnemyEvents {
  EnemyGotShip = 'enemy:got-ship',
}

export type Listener<T extends unknown[] = any[]> = (...args: T) => void

export default class EventBus<
  E extends string = string,
  M extends { [K in E]: unknown[] } = Record<E, any[]>
> {
  private static instance: EventBus

  static getInstance() {
    if (!this.instance) {
      this.instance = new EventBus()
    }
    return this.instance
  }

  private listeners: { [key in E]?: Listener<M[E]>[] } = {}

  private constructor() {}

  on(event: E, callback: Listener<M[E]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event]!.push(callback)
  }

  off(event: E, callback: Listener<M[E]>) {
    if (!this.listeners[event]) {
      return
    }

    this.listeners[event] = this.listeners[event]!.filter(
      (listener) => listener !== callback
    )
  }

  emit(event: E, ...args: M[E]) {
    if (!this.listeners[event]) {
      return
    }

    this.listeners[event]!.forEach((listener) => {
      listener(...args)
    })
  }
}
