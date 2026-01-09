import { create, toBinary } from '@bufbuild/protobuf'
import { Pressable } from '@commonComponents'
import { CreateArticleRequestSchema } from '@gen/wiki/articles/v1/create_article_request_pb'
import { ClientEnvelopeSchema } from '@gen/wiki/envelope/v1/client_pb'
import { articles, webSocket } from '@mst'
import { router } from 'expo-router'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

export const Home: React.FC = observer(() => {
  const { createArticles } = articles
  const { state, ws } = webSocket

  const onPress = (): void => {
    const payload = create(CreateArticleRequestSchema, { body: 'hello!' })

    const envelope = create(ClientEnvelopeSchema, {
      payload: {
        case: 'createArticle',
        value: payload
      }
    })

    ws?.send(toBinary(ClientEnvelopeSchema, envelope))
  }

  useEffect(() => {
    console.log('badRequest', createArticles.badRequest)
  }, [createArticles.badRequest])

  useEffect(() => {
    if (state !== 'open') {
      router.dismissAll()
    }
  }, [state])

  return (
    <Pressable onPress={onPress} style={{ backgroundColor: 'red', flex: 1 }} />
  )
})
