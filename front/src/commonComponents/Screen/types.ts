import type { PropsWithChildren } from 'react'

interface IPaddingOptions {
  hasPadding?: boolean
  hasPaddingHorizontal?: boolean
  hasPaddingVertical?: boolean
}

type TScreenProps = IPaddingOptions & PropsWithChildren

export type { IPaddingOptions, TScreenProps }
