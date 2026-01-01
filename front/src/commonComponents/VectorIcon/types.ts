import type IconSet from '@expo/vector-icons/MaterialIcons'

type TVectorIconProps = React.ComponentProps<typeof IconSet>

type TVectorIconName = TVectorIconProps['name']

export type { TVectorIconName, TVectorIconProps }
