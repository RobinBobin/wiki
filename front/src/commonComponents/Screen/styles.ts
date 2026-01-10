import type { StyleProp, ViewStyle } from 'react-native'
import type { IPaddingOptions } from './types'

import { COLOR } from '@enums'

const screenPadding = 15

const getContainerStyle = ({
  hasPadding = true,
  hasPaddingHorizontal,
  hasPaddingVertical
}: Readonly<IPaddingOptions>): StyleProp<ViewStyle> => [
  {
    backgroundColor: COLOR.SURFACE,
    flex: 1
  },
  (hasPaddingHorizontal ?? hasPadding) && {
    paddingHorizontal: screenPadding
  },
  (hasPaddingVertical ?? hasPadding) && {
    paddingVertical: screenPadding
  }
]

export { getContainerStyle }
