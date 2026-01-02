import type { PressableProps } from 'react-native'

import { Pressable as RNPressable } from 'react-native'

import { useColorNames } from '../useColorNames'

export const Pressable: React.FC<PressableProps> = ({ style, ...props }) => {
  const flattenedStyle = useColorNames(style, [
    {
      colorKey: 'backgroundColor'
    }
  ])

  return <RNPressable {...props} style={flattenedStyle} />
}
