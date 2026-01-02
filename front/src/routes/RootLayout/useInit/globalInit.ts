import { preventAutoHideAsync } from 'expo-splash-screen'

export const globalInit = (): void => {
  void preventAutoHideAsync()
}
