import type {
  TServerEnvelopePayloadCase,
  TServerEnvelopePayloadValue
} from '../types'
import type { IWithResponseVolatile } from './types'

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

export const WithResponse = types
  .model('WithResponse')
  .volatile<IWithResponseVolatile>(() => ({}))
  // .views(self => ({
  //   get
  // }))
  .actions(self => ({
    _setResponse(
      this: void,
      // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
      response: TServerEnvelopePayloadValue,
      tag: TServerEnvelopePayloadCase
    ): void {
      self.response = response

      const { status } = self.response

      if (status?.code === Code.OK) {
        self.badRequest = undefined
        self.errorInfo = undefined

        return
      }

      if (isUndefined(status)) {
        handleError(new Error(`No status in a '${tag}' response`))

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
