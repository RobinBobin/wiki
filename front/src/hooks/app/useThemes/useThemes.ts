import type { IUseThemesReturnType, TAppTheme } from './types'

import {
  DarkTheme as RNavDarkTheme,
  DefaultTheme as RNavLightTheme
} from '@react-navigation/native'
import { useColorScheme } from 'react-native'
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme
} from 'react-native-paper'

import md3DarkJson from './md3Dark.json'
import md3LightJson from './md3Light.json'

export const useThemes = (): IUseThemesReturnType => {
  const md3DarkTheme: TAppTheme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      ...md3DarkJson.colors
    }
  }

  const md3LightTheme: TAppTheme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      ...md3LightJson.colors
    }
  }

  const { DarkTheme, LightTheme } = adaptNavigationTheme({
    materialDark: md3DarkTheme,
    materialLight: md3LightTheme,
    reactNavigationDark: RNavDarkTheme,
    reactNavigationLight: RNavLightTheme
  })

  const rnavDarkTheme = {
    ...RNavDarkTheme,
    colors: {
      ...RNavDarkTheme.colors,
      ...DarkTheme.colors
    }
  }

  const rnavLightTheme = {
    ...RNavLightTheme,
    colors: {
      ...RNavLightTheme.colors,
      ...LightTheme.colors
    }
  }

  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  return {
    navigationTheme: isDark ? rnavDarkTheme : rnavLightTheme,
    paperTheme: isDark ? md3DarkTheme : md3LightTheme
  }
}
