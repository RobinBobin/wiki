import type { IBaseResponseVolatile } from '../../BaseResponse'
import type { TServerEnvelopePayload } from '../../types'

import { BaseResponse } from '../../BaseResponse'

type TPayload = Extract<TServerEnvelopePayload, { case: 'createArticle' }>

export const CreateArticleResponse = BaseResponse.named('CreateArticle')
  .volatile<IBaseResponseVolatile<TPayload>>(() => ({}))
  .actions(self => ({
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    setPayload(this: void, payload: TPayload): void {
      self._setPayload(payload)
    }
  }))
