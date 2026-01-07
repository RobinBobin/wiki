package ws

import (
	"log"

	articlesv1 "wiki/gen/wiki/articles/v1"
	envelopev1 "wiki/gen/wiki/envelope/v1"

	"wiki/gin/ws/article"
)

type responseType interface {
	*articlesv1.CreateArticleResponse |
		*articlesv1.SearchArticlesResponse
}

func wrap[TResponseType responseType](rawResponse TResponseType) *envelopev1.ServerEnvelope {
	switch response := any(rawResponse).(type) {
	case *articlesv1.CreateArticleResponse:
		return &envelopev1.ServerEnvelope{Payload: &envelopev1.ServerEnvelope_CreateArticle{CreateArticle: response}}

	case *articlesv1.SearchArticlesResponse:
		return &envelopev1.ServerEnvelope{Payload: &envelopev1.ServerEnvelope_SearchArticles{SearchArticles: response}}
	}

	return nil
}

func route(envelope *envelopev1.ClientEnvelope) *envelopev1.ServerEnvelope {
	switch payload := envelope.GetPayload().(type) {
	case *envelopev1.ClientEnvelope_CreateArticle:
		return wrap(article.Create(payload.CreateArticle))

	case *envelopev1.ClientEnvelope_SearchArticles:
		return wrap(article.Search(payload.SearchArticles))

	default:
		log.Printf("Unknown payload type: %T", payload)

		return nil
	}
}
