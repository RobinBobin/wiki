import type { ISnackbarModelVolatile, TShowOptions } from './types'

import { types } from 'mobx-state-tree'

const SnackbarModel = types
  .model('SnackbarModel')
  .volatile<ISnackbarModelVolatile>(() => ({}))
  .actions(self => ({
    hide(this: void): void {
      self.options = undefined
    },
    show(this: void, options: TShowOptions): void {
      self.options = options
    }
  }))

export const snackbarModel = SnackbarModel.create()
