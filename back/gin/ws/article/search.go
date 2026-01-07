package article

import (
	"log"
	articlesv1 "wiki/gen/wiki/articles/v1"
)

func Search(request *articlesv1.SearchArticlesRequest) *articlesv1.SearchArticlesResponse {
	log.Print("search request: ", request)

	return nil
}
