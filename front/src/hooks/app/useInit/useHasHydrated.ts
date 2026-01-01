import { useEffect, useState } from 'react'

export const useHasHydrated = (): boolean => {
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setHasHydrated(true))
  }, [])

  return hasHydrated
}
