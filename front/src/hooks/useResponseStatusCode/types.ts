import type { Code } from '@gen/google/rpc/code_pb'

export type TResponseStatusCodeHandlers = Partial<
  Readonly<Record<Code, () => void>>
>
