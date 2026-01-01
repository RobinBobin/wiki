// eslint-disable-next-line import-x/no-unassigned-import
import 'react-native-reanimated'

import { useInit } from '@hooks'

import { App } from '../App'

const RootLayout: React.FC = () => {
  const isInitialized = useInit()

  return isInitialized ? <App /> : undefined
}

export default RootLayout
