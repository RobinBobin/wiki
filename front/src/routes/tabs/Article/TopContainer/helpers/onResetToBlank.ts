import type { Router } from 'expo-router'

import Alert from '@blazejkustra/react-native-alert'

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const onResetToBlank = (router: Router): (() => void) => {
  return () => {
    Alert.alert(
      'Reset to blank?',
      '',
      [
        {
          text: 'No'
        },
        {
          onPress(): void {
            router.replace('/article')
          },
          text: 'Yes'
        }
      ],
      { cancelable: true }
    )
  }
}
