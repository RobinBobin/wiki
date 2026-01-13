import type { IBaseResponseVolatile } from '../../BaseResponse'
import type { TServerEnvelopePayload } from '../../types'

import { BaseResponse } from '../../BaseResponse'

type TPayload = Extract<TServerEnvelopePayload, { case: 'createArticle' }>

export const CreateArticleResponse = BaseResponse.named(
  'CreateArticle'
).volatile<IBaseResponseVolatile<TPayload>>(() => ({}))
