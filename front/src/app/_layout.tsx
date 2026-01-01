// eslint-disable-next-line import-x/no-unassigned-import
import 'react-native-reanimated'

import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { SystemBars } from 'react-native-edge-to-edge'

const RootLayout: React.FC = () => {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      </Stack>
      <SystemBars />
    </ThemeProvider>
  )
}
export default RootLayout
