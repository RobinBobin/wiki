import type { TAppTheme } from '@types'

import { useTheme as useThemeRNP } from 'react-native-paper'

export const useTheme = (): TAppTheme => useThemeRNP<TAppTheme>()
