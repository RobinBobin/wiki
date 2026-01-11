import { snackbarModel } from '@mst/SnackbarModel'
import { isError } from 'radashi'

export const handleError = (error: unknown): void => {
  const text =
    isError(error) ?
      error.message
    : `An unknown error of type '${typeof error}':\n${String(error)}`

  snackbarModel.show({ duration: 5000, text })
}
