import { types } from 'mobx-state-tree'

import { WebSocketModel } from './WebSocketModel'

const UIModel = types.model('UIModel', {
  ws: types.optional(WebSocketModel, {})
})

export const uiModel = UIModel.create()
