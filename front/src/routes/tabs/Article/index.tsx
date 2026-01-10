import Alert from '@blazejkustra/react-native-alert'
import { create } from '@bufbuild/protobuf'
import { commonStyles, Screen, VerticalGap, View } from '@commonComponents'
import { CreateArticleRequestSchema } from '@gen/wiki/articles/v1/create_article_request_pb'
import { articles, webSocket } from '@mst'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

import styles from './styles'

// eslint-disable-next-line max-lines-per-function
export const Article: React.FC = observer(() => {
  const [body, setBody] = useState('')
  const [title, setTitle] = useState('')

  const { badRequest, errorInfo, response } = articles.createArticles
  const { send } = webSocket

  const onClearAll = (): void => {
    Alert.alert(
      'Clear all content?',
      '',
      [
        {
          text: 'No'
        },
        {
          onPress(): void {
            setBody('')
            setTitle('')
          },
          text: 'Yes'
        }
      ],
      { cancelable: true }
    )
  }

  const onSave = (): void => {
    send({
      case: 'createArticle',
      value: create(CreateArticleRequestSchema, { body, title })
    })
  }

  useEffect(() => {
    if (badRequest) {
      console.log(badRequest)
    }

    if (errorInfo) {
      console.log(errorInfo)
    }

    console.log(response?.id, response?.createdAt)
  }, [badRequest, errorInfo, response])

  return (
    <Screen>
      <View style={styles.topContainer}>
        <Button onPress={onClearAll}>Clear all</Button>
        <Button onPress={onSave}>Create</Button>
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
