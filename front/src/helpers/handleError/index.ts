import { alert } from '../alert'

export const handleError = (error: unknown): void => {
  alert((error as Error).message)
}
