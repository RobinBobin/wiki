import Alert from '@blazejkustra/react-native-alert'

export const alert = (message: string, title = ''): void => {
  Alert.alert(title, message, [{ text: 'OK' }], { cancelable: true })
}
