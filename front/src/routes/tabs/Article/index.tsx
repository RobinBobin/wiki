import type { TResponseStatusCodeHandlers } from '@hooks'

import { commonStyles, Screen, VerticalGap, View } from '@commonComponents'
import { Code } from '@gen/google/rpc/code_pb'
import { useResponseStatusCode } from '@hooks'
import { articles, snackbarModel } from '@mst'
import { observer } from 'mobx-react-lite'
import { useMemo, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { Button, HelperText, TextInput } from 'react-native-paper'

import { onClearAll, onSave, setTextAndResetError } from './helpers'
import styles from './styles'

export const Article: React.FC = observer(() => {
  const [body, setBody] = useState('')
  const [isBodyInvalid, setIsBodyInvalid] = useState(false)
  const [isTitleInvalid, setIsTitleInvalid] = useState(false)
  const [title, setTitle] = useState('')

  const { badRequest, payload } = articles.createArticles

  const handlers = useMemo<TResponseStatusCodeHandlers>(
    () => ({
      [Code.OK]: (): void => {
        //
      },
      [Code.ALREADY_EXISTS]: (): void => {
        snackbarModel.show({ text: 'This article already exists.' })
      },
      [Code.INVALID_ARGUMENT]: (): void => {
        const setState =
          badRequest?.fieldViolations[0]?.field === 'body' ?
            setIsBodyInvalid
          : setIsTitleInvalid

        setState(true)
      }
    }),
    [badRequest]
  )

  useResponseStatusCode(handlers, payload, 'Article')

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
