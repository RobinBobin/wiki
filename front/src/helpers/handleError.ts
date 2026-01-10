import { isError } from 'radashi'

import { alert } from './alert'

export const handleError = (error: unknown): void => {
  const message =
    isError(error) ?
      error.message
    : `An unknown error of type '${typeof error}':\n${String(error)}`

  alert(message)
}
