import type { BadRequest } from '@gen/google/rpc/error_details_pb'
import type { TResponseStatusCodeHandlers } from '@hooks'

import { Code } from '@gen/google/rpc/code_pb'
import { currentArticleModel, snackbarModel } from '@mst'
import { useMemo } from 'react'

export const useHandlers = (
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  badRequest: BadRequest | undefined
): TResponseStatusCodeHandlers => {
  const { body, title } = currentArticleModel

  return useMemo<TResponseStatusCodeHandlers>(
    () => ({
      [Code.OK]: (): void => {
        snackbarModel.show({ text: 'Article created.' })
      },
      [Code.ALREADY_EXISTS]: (): void => {
        snackbarModel.show({ text: 'This article already exists.' })
      },
      [Code.INVALID_ARGUMENT]: (): void => {
        const setIsInvalid =
          badRequest?.fieldViolations[0]?.field === 'body' ?
            body.setIsInvalid
          : title.setIsInvalid

        setIsInvalid(true)
      }
    }),
    [badRequest, body, title]
  )
}
