import type { TScreenProps } from './types'

import { SafeAreaView } from 'react-native-safe-area-context'

import { View } from '../View'
import styles, { getContainerStyle } from './styles'

export const Screen: React.FC<TScreenProps> = ({ children, ...props }) => {
  return (
    <View style={getContainerStyle(props)}>
      <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
    </View>
  )
}
