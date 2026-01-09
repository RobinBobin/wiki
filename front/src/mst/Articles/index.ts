import { types } from 'mobx-state-tree'

import { CreateArticles } from './CreateArticles'

const Articles = types.model('Articles', {
  createArticles: types.optional(CreateArticles, {})
})

export const articles = Articles.create()
