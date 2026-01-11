import type { Code } from '@gen/google/rpc/code_pb'
import type { TServerEnvelopePayload } from '../../mst/types'
import type { TResponseStatusCodeHandlers } from './types'

import { handleError } from '@helpers/handleError'
import { isUndefined } from 'radashi'
import { useEffect } from 'react'

export const useResponseStatusCode = (
  handlers: TResponseStatusCodeHandlers,
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  payload: TServerEnvelopePayload | undefined,
  tag: string
): void => {
  useEffect(() => {
    if (isUndefined(payload?.value.status)) {
      return
    }

    const code: Code = payload.value.status.code
    const handler = handlers[code]

    if (handler) {
      handler()

      return
    }

    handleError(
      new Error(
        `'${tag}' didn't handle response status code ${code} from '${payload.case}'`
      )
    )
  }, [handlers, payload, tag])
}
