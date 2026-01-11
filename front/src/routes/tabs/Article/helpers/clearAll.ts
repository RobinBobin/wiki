import type { Dispatch, SetStateAction } from 'react'

import Alert from '@blazejkustra/react-native-alert'

export const onClearAll = (
  setBody: Dispatch<SetStateAction<string>>,
  setTitle: Dispatch<SetStateAction<string>>
): (() => void) => {
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
            setBody('')
            setTitle('')
          },
          text: 'Yes'
        }
      ],
      { cancelable: true }
    )
  }
}
