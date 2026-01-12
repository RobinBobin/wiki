import { create } from '@bufbuild/protobuf'
import { CreateArticleRequestSchema } from '@gen/wiki/article/v1/create_article_request_pb'
import { webSocket } from '@mst'

export const onSave = (body: string, title: string): (() => void) => {
  return () => {
    webSocket.send({
      case: 'createArticle',
      value: create(CreateArticleRequestSchema, { body, title })
    })
  }
}
