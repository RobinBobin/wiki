import type { TServerEnvelopePayload } from '../../types'
import type { IWithResponseVolatile } from '../../WithResponse'

import { WithResponse } from '../../WithResponse'

type TPayload = Extract<TServerEnvelopePayload, { case: 'createArticle' }>

export const CreateArticleResponse = WithResponse.named(
  'CreateArticle'
).volatile<IWithResponseVolatile<TPayload>>(() => ({}))
