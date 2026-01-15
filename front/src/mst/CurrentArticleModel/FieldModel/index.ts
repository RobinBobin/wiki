import type { Instance } from 'mobx-state-tree'

import { types } from 'mobx-state-tree'

const FieldModel = types
  .model('FieldModel', {
    isInvalid: types.optional(types.boolean, false),
    text: types.optional(types.string, '')
  })
  .actions(self => ({
    setIsInvalid(this: void, isInvalid: boolean): void {
      self.isInvalid = isInvalid
    },
    setText(this: void, text: string): void {
      self.text = text
    }
  }))

interface IFieldModelInstance extends Instance<typeof FieldModel> {}
type TFieldModelInstanceR = Readonly<IFieldModelInstance>

export { FieldModel }
export type { TFieldModelInstanceR }
