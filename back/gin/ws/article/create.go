package article

import (
	"log"
	"wiki/db"
	articlesv1 "wiki/gen/wiki/articles/v1"
)

func mustBeValid(body, title string) *articlesv1.CreateArticleResponse_Error_InvalidField {
	var invalidFieldName string

	if len(body) == 0 {
		invalidFieldName = "body"
	} else if len(title) == 0 {
		invalidFieldName = "title"
	}

	if len(invalidFieldName) == 0 {
		return nil
	}

	return &articlesv1.CreateArticleResponse_Error_InvalidField{InvalidField: &articlesv1.CreateArticleResponse_ErrorInvalidField{FieldName: &invalidFieldName}}
}

func Create(request *articlesv1.CreateArticleRequest) *articlesv1.CreateArticleResponse {
	log.Print("create article: ", request)

	body := request.GetBody()
	title := request.GetTitle()

	errorInvalidFieldName := mustBeValid(body, title)

	if errorInvalidFieldName != nil {
		response := &articlesv1.CreateArticleResponse_Error_{Error: &articlesv1.CreateArticleResponse_Error{ErrorType: errorInvalidFieldName}}

		return &articlesv1.CreateArticleResponse{Request: request, Response: response}
	}

	article, err := db.CreateArticle(body, title)

	if err != nil {
		response := &articlesv1.CreateArticleResponse_Error_{Error: &articlesv1.CreateArticleResponse_Error{ErrorType: &articlesv1.CreateArticleResponse_Error_DuplicateTitle{}}}

		return &articlesv1.CreateArticleResponse{Request: request, Response: response}
	}

	createdAt := article.CreatedAt.Unix()

	response := &articlesv1.CreateArticleResponse_Ok{Ok: &articlesv1.CreateArticleResponse_OkResponse{CreatedAt: &createdAt, Id: &article.ID}}

	return &articlesv1.CreateArticleResponse{Request: request, Response: response}
}
