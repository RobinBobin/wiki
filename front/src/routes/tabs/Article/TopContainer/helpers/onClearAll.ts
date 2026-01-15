import Alert from '@blazejkustra/react-native-alert'
import { currentArticleModel } from '@mst'

export const onClearAll = (): (() => void) => {
  const { body, title } = currentArticleModel

  return () => {
    Alert.alert(
      'Clear all content?',
      '',
      [
        {
          text: 'No'
        },
        {
          onPress(): void {
            ;[body, title].forEach(field => {
              field.setIsInvalid(false)
              field.setText('')
            })
          },
          text: 'Yes'
        }
      ],
      { cancelable: true }
    )
  }
}
