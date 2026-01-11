import type { SnackbarProps } from 'react-native-paper'

type TShowOptions = Readonly<
  Pick<SnackbarProps, 'duration'> & {
    text: string
  }
>

interface ISnackbarModelVolatile {
  options?: TShowOptions | undefined
}

export type { ISnackbarModelVolatile, TShowOptions }
