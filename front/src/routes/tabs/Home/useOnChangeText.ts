import type { TextInputProps } from 'react-native-paper'

import { create } from '@bufbuild/protobuf'
import { SearchArticlesRequestSchema } from '@gen/wiki/article/v1/search_articles_request_pb'
import { articles, webSocket } from '@mst'
import { debounce } from 'radashi'
import { useMemo } from 'react'

export const useOnChangeText = (): Exclude<
  TextInputProps['onChangeText'],
  undefined
> => {
  const sendQuery = useMemo(() => {
    return debounce({ delay: 250 }, (query: string): void => {
      if (query.length) {
        webSocket.send({
          case: 'searchArticles',
          value: create(SearchArticlesRequestSchema, {
            query
          })
        })
      }
    })
  }, [])

  const { setQuery } = articles.searchArticles.request

  return query => {
    setQuery(query)
    sendQuery(query)
  }
}
