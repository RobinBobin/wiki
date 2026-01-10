import type { TScreenProps } from './types'

import { SafeAreaView } from 'react-native-safe-area-context'

import commonStyles from '../commonStyles'
import { View } from '../View'
import { getContainerStyle } from './styles'

export const Screen: React.FC<TScreenProps> = ({ children, ...props }) => {
  return (
    <View style={getContainerStyle(props)}>
      <SafeAreaView style={commonStyles.flex1}>{children}</SafeAreaView>
    </View>
  )
}
