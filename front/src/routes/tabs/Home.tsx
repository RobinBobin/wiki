import { create } from '@bufbuild/protobuf'
import { Pressable } from '@commonComponents'
import { CreateArticleRequestSchema } from '@gen/wiki/articles/v1/create_article_request_pb'
import { articles, webSocket } from '@mst'
import { router } from 'expo-router'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'

export const Home: React.FC = observer(() => {
  const { createArticles } = articles
  const { send, state } = webSocket

  const onPress = (): void => {
    send({
      case: 'createArticle',
      value: create(CreateArticleRequestSchema, { body: 'hello!' })
    })
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
