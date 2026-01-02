interface IWebSocketModelVolatile {
  address: string
  shouldReconnect: boolean
  ws?: WebSocket | undefined
}

export type { IWebSocketModelVolatile }
