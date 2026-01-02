import type { TColor } from '@types'

import { COLOR } from '@enums'
import { isString } from 'radashi'

export const isColorName = (color: unknown): color is TColor => {
  return isString(color) && Object.values<string>(COLOR).includes(color)
}
