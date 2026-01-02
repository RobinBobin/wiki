import type { Stack } from 'expo-router'

type TStackScreenOptions = Exclude<
  React.ComponentProps<typeof Stack.Screen>['options'],
  undefined
>

export const STACK_SCREEN_COMMON_OPTIONS: TStackScreenOptions = {
  headerShown: false
}
