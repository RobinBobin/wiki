import type { TAppTheme } from './useThemes'

import { useTheme as useThemeRNP } from 'react-native-paper'

export const useTheme = (): TAppTheme => useThemeRNP<TAppTheme>()
