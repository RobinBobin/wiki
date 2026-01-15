import { create } from '@bufbuild/protobuf'
import { CreateArticleRequestSchema } from '@gen/wiki/article/v1/create_article_request_pb'
import { currentArticleModel, webSocket } from '@mst'

export const onCreate = (): void => {
  const {
    body: { text: body },
    title: { text: title }
  } = currentArticleModel

  webSocket.send({
    case: 'createArticle',
    value: create(CreateArticleRequestSchema, { body, title })
  })
}
