import type { CreateArticleResponse } from '@gen/wiki/articles/v1/create_article_response_pb'

import { getDefaultVolatile, WithResponse } from '../../WithResponse'

export const CreateArticles = WithResponse.named('CreateArticles')
  .volatile(() => getDefaultVolatile<CreateArticleResponse>())
  .actions(self => ({
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    setResponse(this: void, response: CreateArticleResponse): void {
      self._setResponse(response, 'createArticle')
    }
  }))
