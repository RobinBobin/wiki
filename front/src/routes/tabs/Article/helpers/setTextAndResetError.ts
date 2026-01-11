import type { Dispatch, SetStateAction } from 'react'
import type { TextInputProps } from 'react-native-paper'

export const setTextAndResetError = (
  setIsInvalid: Dispatch<SetStateAction<boolean>>,
  setText: Dispatch<SetStateAction<string>>
): Exclude<TextInputProps['onChangeText'], undefined> => {
  return text => {
    setIsInvalid(false)
    setText(text)
  }
}
