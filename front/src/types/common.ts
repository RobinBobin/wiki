import type { COLOR } from '@enums'

type TColor = `${COLOR}`
type TWebSocketState = 'closed' | 'connecting' | 'open'

export type { TColor, TWebSocketState }
