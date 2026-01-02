import type { IWebSocketModelVolatile } from './types'

import { types } from 'mobx-state-tree'

export const WebSocketModel = types
  .model('WebSocketModel')
  .volatile<IWebSocketModelVolatile>(() => ({
    address: '',
    shouldReconnect: true
  }))
  .views(self => ({
    get isConnecting(): boolean {
      return self.ws?.readyState === WebSocket.CONNECTING
    },
    get isOpen(): boolean {
      return self.ws?.readyState === WebSocket.OPEN
    }
  }))
  .actions(self => ({
    _open(): void {
      self.ws = new WebSocket(`ws://${self.address}`)

      self.ws.onclose = ({ wasClean }): void => {
        if (wasClean) {
          return
        }

        const reconnectionDelay = 3000

        setTimeout(() => {
          if (self.shouldReconnect) {
            this._open()
          }
        }, reconnectionDelay)
      }
    }
  }))
  .actions(self => ({
    close(): void {
      self.ws?.close()

      self.shouldReconnect = false
      self.ws = undefined
    },
    open(address: string): void {
      self.address = address
      self.shouldReconnect = true

      self._open()
    }
  }))
