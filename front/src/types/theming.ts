import type { MD3Theme } from 'react-native-paper'
import type { MD3Colors } from 'react-native-paper/lib/typescript/types'
import type { ReadonlyDeep } from 'type-fest'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IAppThemeColors extends MD3Colors {
  // Custom colors go here
}

type TAppTheme = ReadonlyDeep<
  MD3Theme & {
    colors: IAppThemeColors
  }
>

export type { IAppThemeColors, TAppTheme }
