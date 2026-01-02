import { Screen, VerticalGap, View } from '@commonComponents'
import { uiModel } from '@mst'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'

import styles from './styles'

export const Address: React.FC = observer(() => {
  const [address, setAddress] = useState('192.168.1.80:8080')

  const { ws } = uiModel

  const connect = (): void => {
    if (ws.isConnecting) {
      ws.close()
    } else {
      ws.open(address)
    }
  }

  return (
    <Screen>
      <View style={styles.container}>
        <TextInput
          onChangeText={setAddress}
          placeholder='Address'
          value={address}
        />
        <VerticalGap height={15} />
        <Button mode='contained' onPress={connect}>
          {ws.isConnecting ? 'Connecting...' : 'Connect'}
        </Button>
      </View>
    </Screen>
  )
})
