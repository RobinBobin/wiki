import { types } from 'mobx-state-tree'

import { CreateArticleResponse } from './CreateArticleResponse'

const Articles = types.model('Articles', {
  createArticleResponse: types.optional(CreateArticleResponse, {})
})

export const articles = Articles.create()
