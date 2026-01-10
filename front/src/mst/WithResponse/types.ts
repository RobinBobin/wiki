import type { BadRequest, ErrorInfo } from '@gen/google/rpc/error_details_pb'
import type { TServerEnvelopePayloadValue } from '../types'

export interface IWithResponseVolatile<
  T extends TServerEnvelopePayloadValue = TServerEnvelopePayloadValue
> {
  badRequest?: BadRequest | undefined
  errorInfo?: ErrorInfo | undefined
  isOk: boolean
  response?: T
}
