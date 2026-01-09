import type { CreateArticleResponse } from '@gen/wiki/articles/v1/create_article_response_pb'
import type { IWithResponseVolatile } from '../../WithResponse'

import { WithResponse } from '../../WithResponse'

export const CreateArticles = WithResponse.named('CreateArticles')
  .volatile<IWithResponseVolatile<CreateArticleResponse>>(() => ({}))
  .actions(self => ({
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    setResponse(this: void, response: CreateArticleResponse): void {
      self._setResponse(response, 'createArticle')
    }
  }))
