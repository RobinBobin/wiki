import { types } from 'mobx-state-tree'

import { FieldModel } from './FieldModel'

const CurrentArticleModel = types.model('CurrentArticleModel', {
  body: types.optional(FieldModel, {}),
  title: types.optional(FieldModel, {})
})

export const currentArticleModel = CurrentArticleModel.create()
