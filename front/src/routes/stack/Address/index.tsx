import type { TWebSocketState } from '@types'

import { Screen, VerticalGap, View } from '@commonComponents'
import { webSocket } from '@mst'
import { router } from 'expo-router'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { Button, TextInput } from 'react-native-paper'

import styles from './styles'

export const Address: React.FC = observer(() => {
  const [address, setAddress] = useState('192.168.1.80:8080')

  const { close, open, state } = webSocket

  const connect = (): void => {
    switch (state) {
      case 'closed':
        open(address)
        break

      case 'connecting':
      case 'open':
        close()
        break
    }
  }

  useEffect(() => {
    return close
  }, [close])

  useEffect(() => {
    if (state === 'open') {
      router.navigate('/home')
    }
  }, [state])

  const titles: Record<TWebSocketState, string> = {
    closed: 'Connect',
    connecting: 'Connecting...',
    open: 'Disconnect'
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
        <Button labelStyle={styles.button} mode='contained' onPress={connect}>
          {titles[state]}
        </Button>
      </View>
    </Screen>
  )
})
