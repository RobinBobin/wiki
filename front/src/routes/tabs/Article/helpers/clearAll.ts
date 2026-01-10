import type { Dispatch, SetStateAction } from 'react'

import Alert from '@blazejkustra/react-native-alert'

type TSetState = Dispatch<SetStateAction<string>>

export const onClearAll = (
  setBody: TSetState,
  setTitle: TSetState
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
