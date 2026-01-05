package ws

import (
	"log"
	articlesv1 "wiki/gen/wiki/articles/v1"
)

func processSearchArticlesRequest(searchArticlesRequest *articlesv1.SearchArticlesRequest) {
	log.Print("search request: ", searchArticlesRequest)
}
