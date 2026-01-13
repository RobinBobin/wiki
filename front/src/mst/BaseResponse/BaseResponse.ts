import type { TServerEnvelopePayload } from '../types'
import type { IBaseResponseVolatile } from './types'

import { isMessage } from '@bufbuild/protobuf'
import { anyUnpack } from '@bufbuild/protobuf/wkt'
import { Code } from '@gen/google/rpc/code_pb'
import {
  BadRequestSchema,
  ErrorInfoSchema
} from '@gen/google/rpc/error_details_pb'
import { handleError } from '@helpers/handleError'
import { types } from 'mobx-state-tree'
import { isUndefined } from 'radashi'

import { REGISTRY } from './registry'

export const BaseResponse = types
  .model('BaseResponse')
  .volatile<IBaseResponseVolatile>(() => ({}))
  .actions(self => ({
    setPayload(
      this: void,
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      payload: TServerEnvelopePayload
    ): void {
      self.badRequest = undefined
      self.errorInfo = undefined
      self.payload = payload

      const { status } = self.payload.value

      if (status?.code === Code.OK) {
        return
      }

      if (isUndefined(status)) {
        handleError(new Error(`No status in a '${self.payload.case}' response`))

        return
      }

      const isGeneralError =
        [Code.INTERNAL, Code.UNKNOWN].includes(status.code) &&
        !status.details.length

      if (isGeneralError) {
        handleError(new Error('Your request failed.'))

        return
      }

      for (const details of status.details) {
        const unpacked = anyUnpack(details, REGISTRY)

        if (isMessage(unpacked, BadRequestSchema)) {
          self.badRequest = unpacked
        } else if (isMessage(unpacked, ErrorInfoSchema)) {
          self.errorInfo = unpacked
        }
      }
    }
  }))
