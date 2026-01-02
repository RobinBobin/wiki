import type { TWebSocketState } from '@types'
import type { IWebSocketModelVolatile } from './types'

import { types } from 'mobx-state-tree'

const WebSocketModel = types
  .model('WebSocketModel')
  .volatile<IWebSocketModelVolatile>(() => ({
    address: '',
    shouldReconnect: true,
    state: 'closed'
  }))
  .actions(self => ({
    _setState(state: TWebSocketState): void {
      self.state = state
    }
  }))
  .actions(self => ({
    _open(): void {
      self._setState('connecting')

      self.ws = new WebSocket(`ws://${self.address}/ws`)

      self.ws.onclose = ({ wasClean }): void => {
        if (wasClean) {
          return
        }

        const reconnectionDelay = 3000

        setTimeout(() => {
          if (self.shouldReconnect) {
            this._open()
          } else {
            self._setState('closed')
          }
        }, reconnectionDelay)
      }

      self.ws.onmessage = (event): void => {
        console.log(event.type, event.data)
      }

      self.ws.onopen = (): void => {
        self._setState('open')
      }
    }
  }))
  .actions(self => ({
    close(this: void): void {
      self.ws?.close()

      self.shouldReconnect = false
      self.ws = undefined

      self._setState('closed')
    },
    open(this: void, address: string): void {
      self.address = address
      self.shouldReconnect = true

      self._open()
    }
  }))

export const webSocket = WebSocketModel.create()
