import { types } from 'mobx-state-tree'

import { Request } from './Request'
import { Response } from './Response'

export const SearchArticles = types.model('SearchArticles', {
  request: types.optional(Request, {}),
  response: types.optional(Response, {})
})
