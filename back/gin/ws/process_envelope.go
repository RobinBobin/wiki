package ws

import (
	"log"
	envelopev1 "wiki/gen/wiki/envelope/v1"
)

func processEnvelope(envelope *envelopev1.Envelope) {
	switch payload := envelope.GetPayload().(type) {
	case *envelopev1.Envelope_SearchArticlesRequest:
		processSearchArticlesRequest(payload.SearchArticlesRequest)

	default:
		log.Printf("Unknown payload type: %T", payload)
	}
}
