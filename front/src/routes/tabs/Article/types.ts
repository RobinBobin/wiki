import type { ArticleJson } from '@gen/wiki/article/v1/article_pb'

export type TArticleParams = Omit<ArticleJson, 'id'> & {
  id?: string
}
