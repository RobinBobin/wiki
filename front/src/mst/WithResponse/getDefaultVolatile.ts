import type { TServerEnvelopePayloadValue } from '../types'
import type { IWithResponseVolatile } from './types'

export const getDefaultVolatile = <
  T extends TServerEnvelopePayloadValue
>(): IWithResponseVolatile<T> => ({ isOk: true })
