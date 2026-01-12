package article

import (
	"log"
	articlev1 "wiki/gen/wiki/article/v1"
)

func Search(request *articlev1.SearchArticlesRequest) *articlev1.SearchArticlesResponse {
	log.Print("search request: ", request)

	return nil
}
