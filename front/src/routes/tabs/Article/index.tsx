import { commonStyles, Screen, VerticalGap, View } from '@commonComponents'
import { Code } from '@gen/google/rpc/code_pb'
import { articles } from '@mst'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { Button, HelperText, TextInput } from 'react-native-paper'

import { onClearAll, onSave, setTextAndResetError } from './helpers'
import styles from './styles'

// eslint-disable-next-line max-lines-per-function
export const Article: React.FC = observer(() => {
  const [body, setBody] = useState('')
  const [isBodyInvalid, setIsBodyInvalid] = useState(false)
  const [isTitleInvalid, setIsTitleInvalid] = useState(false)
  const [title, setTitle] = useState('')

  const { badRequest, errorInfo, isOk, response } = articles.createArticles

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
    switch (response?.status?.code) {
      case Code.OK:
        break

      case Code.ALREADY_EXISTS:
        console.log('Already exists')
        break

      case Code.INVALID_ARGUMENT: {
        const setState =
          badRequest?.fieldViolations[0]?.field === 'body' ?
            setIsBodyInvalid
          : setIsTitleInvalid

        setState(true)

        break
      }

      default:
        break
    }
  }, [badRequest, errorInfo, isOk, response])

  return (
    <Screen>
      <View style={styles.topContainer}>
        <Button onPress={onClearAll(setBody, setTitle)}>Clear all</Button>
        <Button onPress={onSave(body, title)}>Create</Button>
      </View>
      <TextInput
        error={isTitleInvalid}
        onChangeText={setTextAndResetError(setIsTitleInvalid, setTitle)}
        placeholder='Title'
        value={title}
      />
      <HelperText type='error' visible={isTitleInvalid}>
        Invalid value
      </HelperText>
      <VerticalGap height={20} />
      <KeyboardAvoidingView behavior='height' style={commonStyles.flex1}>
        <TextInput
          multiline
          error={isBodyInvalid}
          onChangeText={setTextAndResetError(setIsBodyInvalid, setBody)}
          placeholder='Body'
          style={commonStyles.flex1}
          value={body}
        />
        <HelperText type='error' visible={isBodyInvalid}>
          Invalid value
        </HelperText>
      </KeyboardAvoidingView>
    </Screen>
  )
})
