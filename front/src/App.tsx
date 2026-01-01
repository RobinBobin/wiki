import { useThemes } from '@hooks'
import { ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { SystemBars } from 'react-native-edge-to-edge'
import { PaperProvider } from 'react-native-paper'

export const App: React.FC = () => {
  const { navigationTheme, paperTheme } = useThemes()

  return (
    <ThemeProvider value={navigationTheme}>
      <PaperProvider theme={paperTheme}>
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
      <SystemBars />
    </ThemeProvider>
  )
}
