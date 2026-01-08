package utils

import (
	"wiki/gen/google/rpc"

	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/known/anypb"
)

func PackToAny(messages ...proto.Message) (
	sliceOfAny []*anypb.Any,
	errorStatus *rpc.Status,
) {
	sliceOfAny = make([]*anypb.Any, len(messages))

	for index, message := range messages {
		messageAsAny, err := anypb.New(message)

		if err != nil {
			errorStatus = &rpc.Status{
				Code:    int32(rpc.Code_INTERNAL),
				Message: err.Error(),
			}

			return
		}

		sliceOfAny[index] = messageAsAny
	}

	return
}
