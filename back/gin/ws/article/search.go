package article

import (
	"wiki/db"
	"wiki/gen/google/rpc"
	articlev1 "wiki/gen/wiki/article/v1"
)

func Search(request *articlev1.SearchArticlesRequest) *articlev1.SearchArticlesResponse {
	articles := db.SearchArticles(*request.Query)

	var Articles = make([]*articlev1.Article, len(articles))

	for index, article := range articles {
		Articles[index] = &articlev1.Article{
			Body:  &article.Body,
			Id:    &article.ID,
			Title: &article.Title,
		}
	}

	return &articlev1.SearchArticlesResponse{
		Articles: Articles,
		Request:  request,
		Status:   &rpc.Status{Code: int32(rpc.Code_OK)},
	}
}
