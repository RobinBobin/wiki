import type { Article } from '@gen/wiki/article/v1/article_pb'
import type { ListRenderItem } from 'react-native'
import type { ListItemProps } from 'react-native-paper'
import type { TArticleParams } from '../../Article'

import { articles, snackbarModel } from '@mst'
import { useRouter } from 'expo-router'
import { observer } from 'mobx-react-lite'
import { FlatList } from 'react-native'
import { List, Text, TouchableRipple } from 'react-native-paper'

interface IArticlesProps {
  isQueryEmpty: boolean
}

export const Articles: React.FC<IArticlesProps> = observer(
  ({ isQueryEmpty }) => {
    const router = useRouter()

    const { payload } = articles.searchArticles.response

    if (!payload || isQueryEmpty) {
      return undefined
    }

    const renderItem: ListRenderItem<Readonly<Article>> = ({
      item: { body, id, title }
    }) => {
      const deleteArticle = (): void => {
        snackbarModel.show({
          text: `Delete article ${id}.`
        })
      }

      const edit = (): void => {
        const params: TArticleParams = {
          body,
          id: id.toString(),
          title
        }

        router.navigate({ params, pathname: '/article' })
      }

      const right: ListItemProps['right'] = props => (
        <TouchableRipple onPress={deleteArticle}>
          <List.Icon {...props} icon='delete' />
        </TouchableRipple>
      )

      return <List.Item onPress={edit} right={right} title={title} />
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
