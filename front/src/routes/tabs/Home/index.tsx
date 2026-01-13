import { Screen, VerticalGap } from '@commonComponents'
import { articles } from '@mst'
import { observer } from 'mobx-react-lite'
import { TextInput } from 'react-native-paper'

import { Articles } from './Articles'
import { useOnChangeText } from './useOnChangeText'

export const Home: React.FC = observer(() => {
  const onChangeText = useOnChangeText()

  const { query } = articles.searchArticles.request

  return (
    <Screen>
      <TextInput
        onChangeText={onChangeText}
        placeholder='Article title'
        value={query}
      />
      <VerticalGap height={10} />
      <Articles isQueryEmpty={!query.length} />
    </Screen>
  )
})
