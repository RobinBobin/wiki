import { fromBinary } from '@bufbuild/protobuf'
import { ServerEnvelopeSchema } from '@gen/wiki/envelope/v1/server_pb'
import { handleError } from '@helpers/handleError'

import { articles } from '../Articles'

export const onMessage: WebSocket['onmessage'] = event => {
  try {
    const { data } = event as MessageEvent<ArrayBuffer>
    const { payload } = fromBinary(ServerEnvelopeSchema, new Uint8Array(data))
    const { case: pcase } = payload

    switch (pcase) {
      case 'createArticle': {
        articles.createArticles.setResponse(payload)
        break
      }

      case 'searchArticles':
        break

      case undefined:
        throw new Error("'payload.case' is undefined")

      default:
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Unhandled 'payload.case': '${pcase}'`)
    }
  } catch (error) {
    handleError(error)
  }
}
