import { handleError } from '@helpers/handleError'
import { hide } from 'expo-splash-screen'
import useAsync from 'react-use/lib/useAsync'

import { globalInit } from './globalInit'
import { useHasHydrated } from './useHasHydrated'

globalInit()

export const useInit = (): boolean => {
  const isInitialized = [useHasHydrated()].every(Boolean)

  const { loading: isLoading, value: isOk } =
    useAsync(async (): Promise<boolean> => {
      if (!isInitialized) {
        return false
      }

      try {
        // To be replaced with real async initialization.
        await Promise.resolve()

        hide()

        return true
      } catch (error) {
        handleError(error)

        return false
      }
    }, [isInitialized])

  return !isLoading && (isOk ?? false)
}
