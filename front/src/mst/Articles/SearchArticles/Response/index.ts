import type { IBaseResponseVolatile } from '@mst/BaseResponse'
import type { TServerEnvelopePayload } from '@mst/types'

import { BaseResponse } from '@mst/BaseResponse'

type TPayload = Extract<TServerEnvelopePayload, { case: 'searchArticles' }>

export const Response = BaseResponse.named('SearchArticlesResponse')
  .volatile<IBaseResponseVolatile<TPayload>>(() => ({}))
  .actions(self => ({
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    setPayload(this: void, payload: TPayload): void {
      self._setPayload(payload)
    }
  }))
