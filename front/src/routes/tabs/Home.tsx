import { Pressable } from '@commonComponents'
import { webSocket } from '@mst'
import { router } from 'expo-router'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

export const Home: React.FC = observer(() => {
  const { state, ws } = webSocket

  const onPress = (): void => {
    ws?.send('!!! Hooray !!!')
  }

  useEffect(() => {
    if (state !== 'open') {
      router.dismissAll()
    }
  }, [state])

  return (
    <Pressable onPress={onPress} style={{ backgroundColor: 'red', flex: 1 }} />
  )
})
