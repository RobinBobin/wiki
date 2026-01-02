import type { StyleProp, ViewStyle } from 'react-native'
import type { IPaddingOptions } from './types'

import { COLOR } from '@enums'
import { StyleSheet } from 'react-native'

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

export default StyleSheet.create({
  safeArea: {
    flex: 1
  }
})
