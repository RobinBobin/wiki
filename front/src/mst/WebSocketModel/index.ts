import type { TWebSocketState } from '@types'
import type { IWebSocketModelVolatile, TClientEnvelopePayload } from './types'

import { create, toBinary } from '@bufbuild/protobuf'
import { ClientEnvelopeSchema } from '@gen/wiki/envelope/v1/client_pb'
import { types } from 'mobx-state-tree'

import { onMessage } from './onMessage'

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

      self.ws.binaryType = 'arraybuffer'

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

      self.ws.onmessage = onMessage

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
    },

    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    send(this: void, payload: TClientEnvelopePayload): void {
      const envelope = create(ClientEnvelopeSchema, {
        payload
      })

      self.ws?.send(toBinary(ClientEnvelopeSchema, envelope))
    }
  }))

export const webSocket = WebSocketModel.create()
