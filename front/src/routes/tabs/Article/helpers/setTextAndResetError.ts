import type { TFieldModelInstanceR } from '@mst'
import type { TextInputProps } from 'react-native-paper'

export const setTextAndResetError = (
  field: TFieldModelInstanceR
): Exclude<TextInputProps['onChangeText'], undefined> => {
  return text => {
    field.setIsInvalid(false)
    field.setText(text)
  }
}
