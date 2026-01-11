import { Snackbar } from '@commonComponents'
import { ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { SystemBars } from 'react-native-edge-to-edge'
import { PaperProvider } from 'react-native-paper'

import { STACK_SCREEN_COMMON_OPTIONS } from './stackScreenCommonOptions'
import { useThemes } from './useThemes'

export const App: React.FC = () => {
  const { navigationTheme, paperTheme } = useThemes()

  return (
    <ThemeProvider value={navigationTheme}>
      <PaperProvider theme={paperTheme}>
        <Stack>
          <Stack.Screen name='index' options={STACK_SCREEN_COMMON_OPTIONS} />
          <Stack.Screen name='(tabs)' options={STACK_SCREEN_COMMON_OPTIONS} />
        </Stack>
        <Snackbar />
      </PaperProvider>
      <SystemBars />
    </ThemeProvider>
  )
}
