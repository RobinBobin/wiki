package ws

import (
	"log"

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
		log.Printf("Unknown payload type: %T", payload)

		return nil
	}
}
