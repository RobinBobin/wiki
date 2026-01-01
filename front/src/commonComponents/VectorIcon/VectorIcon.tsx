import type { TVectorIconProps } from './types'

import IconSet from '@expo/vector-icons/MaterialIcons'

export const VectorIcon: React.FC<TVectorIconProps> = props => {
  return <IconSet {...props} />
}
