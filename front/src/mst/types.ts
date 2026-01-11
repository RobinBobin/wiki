import type { ServerEnvelope } from '@gen/wiki/envelope/v1/server_pb'

export type TServerEnvelopePayload = Exclude<
  ServerEnvelope['payload'],
  { case: undefined }
>
