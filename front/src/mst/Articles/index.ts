import { types } from 'mobx-state-tree'

import { CreateArticleResponse } from './CreateArticleResponse'
import { SearchArticles } from './SearchArticles'

const Articles = types.model('Articles', {
  createArticleResponse: types.optional(CreateArticleResponse, {}),
  searchArticles: types.optional(SearchArticles, {})
})

export const articles = Articles.create()
