import { Screen, View } from '@commonComponents'
import { useRouter } from 'expo-router'
import { Button } from 'react-native-paper'

import styles from './styles'

export const Address: React.FC = () => {
  const router = useRouter()

  return (
    <Screen>
      <View style={styles.container}>
        <Button mode='contained' onPress={() => router.navigate('/home')}>
          Hooray!
        </Button>
      </View>
    </Screen>
  )
}
