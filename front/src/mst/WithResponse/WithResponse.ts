import type {
  TServerEnvelopePayloadCase,
  TServerEnvelopePayloadValue
} from '../types'

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

import { getDefaultVolatile } from './getDefaultVolatile'
import { REGISTRY } from './registry'

export const WithResponse = types
  .model('WithResponse')
  .volatile(getDefaultVolatile)
  .actions(self => ({
    _setResponse(
      this: void,
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      response: TServerEnvelopePayloadValue,
      tag: TServerEnvelopePayloadCase
    ): void {
      self.badRequest = undefined
      self.errorInfo = undefined
      self.response = response

      const { status } = self.response

      self.isOk = status?.code === Code.OK

      if (self.isOk) {
        return
      }

      if (isUndefined(status)) {
        handleError(new Error(`No status in a '${tag}' response`))

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
