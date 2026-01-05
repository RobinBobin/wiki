import { create, toBinary } from '@bufbuild/protobuf'
import { Pressable } from '@commonComponents'
import { SearchArticlesResponseSchema } from '@gen/wiki/articles/v1/search_articles_response_pb'
import { EnvelopeSchema } from '@gen/wiki/envelope/v1/envelope_pb'
import { webSocket } from '@mst'
import { router } from 'expo-router'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

export const Home: React.FC = observer(() => {
  const { state, ws } = webSocket

  const onPress = (): void => {
    const payload = create(SearchArticlesResponseSchema, {})

    const envelope = create(EnvelopeSchema, {
      payload: {
        case: 'searchArticlesResponse',
        value: payload
      }
    })

    ws?.send(toBinary(EnvelopeSchema, envelope))
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
