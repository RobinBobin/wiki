import { types } from 'mobx-state-tree'

export const Request = types
  .model('SearchArticlesRequest', {
    query: types.optional(types.string, '')
  })
  .actions(self => ({
    setQuery(this: void, query: string): void {
      self.query = query
    }
  }))
