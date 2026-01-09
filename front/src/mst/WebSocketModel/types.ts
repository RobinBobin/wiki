import type { ClientEnvelope } from '@gen/wiki/envelope/v1/client_pb'
import type { TWebSocketState } from '@types'

interface IWebSocketModelVolatile {
  address: string
  shouldReconnect: boolean
  state: TWebSocketState
  ws?: WebSocket | undefined
}

type TClientEnvelopePayload = ClientEnvelope['payload']

export type { IWebSocketModelVolatile, TClientEnvelopePayload }
