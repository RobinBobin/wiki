import type { BadRequest, ErrorInfo } from '@gen/google/rpc/error_details_pb'
import type { TServerEnvelopePayload } from '../types'

export interface IWithResponseVolatile<
  T extends TServerEnvelopePayload = TServerEnvelopePayload
> {
  badRequest?: BadRequest | undefined
  errorInfo?: ErrorInfo | undefined
  payload?: T
}
