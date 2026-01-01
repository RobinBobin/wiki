import { Alert } from 'react-native'

export const alert = (message: string, title = ''): void => {
  Alert.alert(title, message, [{ text: 'OK' }], { cancelable: true })
}
