import { App } from '../stack'
import { useInit } from './useInit'

export const RootLayout: React.FC = () => {
  const isInitialized = useInit()

  return isInitialized ? <App /> : undefined
}
