import type { TWebSocketState } from '@types'

interface IWebSocketModelVolatile {
  address: string
  shouldReconnect: boolean
  state: TWebSocketState
  ws?: WebSocket | undefined
}

export type { IWebSocketModelVolatile }
