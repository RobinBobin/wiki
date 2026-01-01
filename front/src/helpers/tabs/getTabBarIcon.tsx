import type { TVectorIconName } from '@commonComponents'
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'

import { VectorIcon } from '@commonComponents'

export const getTabBarIcon = (
  name: TVectorIconName
): Exclude<BottomTabNavigationOptions['tabBarIcon'], undefined> => {
  return ({ color, size }) => (
    <VectorIcon color={color} name={name} size={size} />
  )
}
