import type { ViewProps } from 'react-native'

import { View as RNView } from 'react-native'

import { useColorNames } from '../useColorNames'

export const View: React.FC<ViewProps> = ({ style, ...props }) => {
  const flattenedStyle = useColorNames(style, [
    {
      colorKey: 'backgroundColor'
    },
    {
      colorKey: 'borderColor'
    }
  ])

  return <RNView {...props} style={flattenedStyle} />
}
