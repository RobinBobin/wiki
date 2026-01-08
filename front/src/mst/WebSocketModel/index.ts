/* eslint-disable max-lines-per-function */
import type { TWebSocketState } from '@types'
import type { IWebSocketModelVolatile } from './types'

import { createRegistry, fromBinary, isMessage } from '@bufbuild/protobuf'
import { anyUnpack } from '@bufbuild/protobuf/wkt'
import { Code } from '@gen/google/rpc/code_pb'
import {
  BadRequestSchema,
  ErrorInfoSchema
} from '@gen/google/rpc/error_details_pb'
import { ServerEnvelopeSchema } from '@gen/wiki/envelope/v1/server_pb'
import { types } from 'mobx-state-tree'

const registry = createRegistry(BadRequestSchema, ErrorInfoSchema)

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

      self.ws.onmessage = (event): void => {
        try {
          const { data } = event as MessageEvent<ArrayBuffer>

          const envelope = fromBinary(
            ServerEnvelopeSchema,
            new Uint8Array(data)
          )

          console.log(envelope)

          const { payload } = envelope

          if (payload.case !== 'createArticle') {
            return
          }

          const { value } = payload

          if (value.status?.code === Code.OK) {
            return
          }

          for (const details of value.status?.details ?? []) {
            const unpacked = anyUnpack(details, registry)

            if (isMessage(unpacked, BadRequestSchema)) {
              console.log('bad request', unpacked.fieldViolations)
            } else if (isMessage(unpacked, ErrorInfoSchema)) {
              console.log('error info', unpacked)
            }
          }
        } catch (error) {
          console.log('Failed to unmarshal:', error)
        }
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
