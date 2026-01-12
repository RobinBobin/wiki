package ws

import (
	"wiki/gen/google/rpc"
	defresponsev1 "wiki/gen/wiki/defresponse/v1"
	envelopev1 "wiki/gen/wiki/envelope/v1"

	"wiki/gin/ws/article"
)

func route(envelope *envelopev1.ClientEnvelope) *envelopev1.ServerEnvelope {
	switch payload := envelope.GetPayload().(type) {
	case *envelopev1.ClientEnvelope_CreateArticle:
		return &envelopev1.ServerEnvelope{
			Payload: &envelopev1.ServerEnvelope_CreateArticle{
				CreateArticle: article.Create(payload.CreateArticle),
			},
		}

	case *envelopev1.ClientEnvelope_SearchArticles:
		return &envelopev1.ServerEnvelope{
			Payload: &envelopev1.ServerEnvelope_SearchArticles{
				SearchArticles: article.Search(payload.SearchArticles),
			},
		}

	default:
		return &envelopev1.ServerEnvelope{
			Payload: &envelopev1.ServerEnvelope_DefaultResponse{
				DefaultResponse: &defresponsev1.DefaultResponse{
					Status: &rpc.Status{
						Code:    int32(rpc.Code_UNIMPLEMENTED),
						Message: "Unknown payload type",
					},
				},
			},
		}

	}
}
