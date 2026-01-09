import type { ServerEnvelope } from '@gen/wiki/envelope/v1/server_pb'

type TServerEnvelopePayload = Exclude<
  ServerEnvelope['payload'],
  { case: undefined }
>

type TServerEnvelopePayloadCase = TServerEnvelopePayload['case']
type TServerEnvelopePayloadValue = TServerEnvelopePayload['value']

export type { TServerEnvelopePayloadCase, TServerEnvelopePayloadValue }
