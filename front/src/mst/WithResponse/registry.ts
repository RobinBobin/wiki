import { createRegistry } from '@bufbuild/protobuf'
import {
  BadRequestSchema,
  ErrorInfoSchema
} from '@gen/google/rpc/error_details_pb'

export const REGISTRY = createRegistry(BadRequestSchema, ErrorInfoSchema)
