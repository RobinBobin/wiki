import { commonStyles, Screen, VerticalGap } from '@commonComponents'
import { useResponseStatusCode } from '@hooks'
import { articles, currentArticleModel } from '@mst'
import { observer } from 'mobx-react-lite'
import { KeyboardAvoidingView } from 'react-native'
import { HelperText, TextInput } from 'react-native-paper'

import { setTextAndResetError } from './helpers'
import { useArticleParams, useHandlers } from './hooks'
import { TopContainer } from './TopContainer'

export const Article: React.FC = observer(() => {
  const { badRequest, payload } = articles.createArticleResponse
  const { body, title } = currentArticleModel

  const id = useArticleParams()
  const handlers = useHandlers(badRequest)

  useResponseStatusCode(handlers, payload, 'Article')

  return (
    <Screen>
      <TopContainer id={id} />
      <TextInput
        error={title.isInvalid}
        onChangeText={setTextAndResetError(title)}
        placeholder='Title'
        value={title.text}
      />
      <HelperText type='error' visible={title.isInvalid}>
        Invalid value
      </HelperText>
      <VerticalGap height={20} />
      <KeyboardAvoidingView behavior='height' style={commonStyles.flex1}>
        <TextInput
          multiline
          error={body.isInvalid}
          onChangeText={setTextAndResetError(body)}
          placeholder='Body'
          style={commonStyles.flex1}
          value={body.text}
        />
        <HelperText type='error' visible={body.isInvalid}>
          Invalid value
        </HelperText>
      </KeyboardAvoidingView>
    </Screen>
  )
})
