import type { Article } from '@gen/wiki/article/v1/article_pb'
import type { ListRenderItem } from 'react-native'
import type { ListItemProps } from 'react-native-paper'

import { handleError } from '@helpers/handleError'
import { articles } from '@mst'
import { observer } from 'mobx-react-lite'
import { FlatList } from 'react-native'
import { List, Text } from 'react-native-paper'

interface IArticlesProps {
  isQueryEmpty: boolean
}

export const Articles: React.FC<IArticlesProps> = observer(
  ({ isQueryEmpty }) => {
    const { payload } = articles.searchArticles.response

    if (!payload || isQueryEmpty) {
      return undefined
    }

    const renderItem: ListRenderItem<Readonly<Article>> = ({
      item: { id, title }
    }) => {
      const onPress = (): void => {
        handleError(new Error(`${title} (${id})`))
      }

      const right: ListItemProps['right'] = props => (
        <List.Icon {...props} icon='delete' />
      )

      return <List.Item onPress={onPress} right={right} title={title} />
    }

    const listEmptyComponent = <Text>No articles found</Text>

    return (
      <FlatList
        ListEmptyComponent={listEmptyComponent}
        data={payload.value.articles}
        renderItem={renderItem}
      />
    )
  }
)
