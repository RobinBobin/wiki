import { commonStyles, Screen, VerticalGap, View } from '@commonComponents'
import { articles } from '@mst'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

import { onClearAll, onSave } from './helpers'
import styles from './styles'

export const Article: React.FC = observer(() => {
  const [body, setBody] = useState('')
  const [title, setTitle] = useState('')

  const { badRequest, errorInfo, isOk, response } = articles.createArticles

  useEffect(() => {
    if (isOk) {
      return
    }

    console.log(response?.status?.code)

    if (badRequest) {
      console.log(badRequest)
    }

    if (errorInfo) {
      console.log(errorInfo)
    }
  }, [badRequest, errorInfo, isOk, response])

  return (
    <Screen>
      <View style={styles.topContainer}>
        <Button onPress={onClearAll(setBody, setTitle)}>Clear all</Button>
        <Button onPress={onSave(body, title)}>Create</Button>
      </View>
      <TextInput onChangeText={setTitle} placeholder='Title' value={title} />
      <VerticalGap height={20} />
      <KeyboardAvoidingView behavior='height' style={commonStyles.flex1}>
        <TextInput
          multiline
          onChangeText={setBody}
          placeholder='Body'
          style={commonStyles.flex1}
          value={body}
        />
      </KeyboardAvoidingView>
    </Screen>
  )
})
