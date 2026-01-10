package article

import (
	"errors"
	"log"
	"wiki/db"
	dberrors "wiki/db/errors"
	"wiki/gen/google/rpc"
	articlesv1 "wiki/gen/wiki/articles/v1"
	"wiki/utils"

	"gorm.io/gorm"
)

func handleDefaultError(
	err error,
	request *articlesv1.CreateArticleRequest,
) *articlesv1.CreateArticleResponse {
	log.Print("handleDefaultError()")
	log.Printf("Request: %v", request)
	log.Printf("Error: %v", err)

	return &articlesv1.CreateArticleResponse{
		Request: request,
		Status: &rpc.Status{
			Code: int32(rpc.Code_INTERNAL),
		},
	}
}

func handleDuplicateKeyError(
	err error,
	request *articlesv1.CreateArticleRequest,
) *articlesv1.CreateArticleResponse {
	if !errors.Is(err, gorm.ErrDuplicatedKey) {
		return nil
	}

	return &articlesv1.CreateArticleResponse{
		Request: request,
		Status: &rpc.Status{
			Code: int32(rpc.Code_ALREADY_EXISTS),
		},
	}
}

func handleInvalidValueError(
	err error,
	request *articlesv1.CreateArticleRequest,
) *articlesv1.CreateArticleResponse {
	invalidValueError, ok := err.(*dberrors.InvalidValueError)

	if !ok {
		return nil
	}

	reason := rpc.Code_name[int32(rpc.Code_INVALID_ARGUMENT)]

	details, errorStatus := utils.PackToAny(
		&rpc.ErrorInfo{
			Reason: reason,
		},
		&rpc.BadRequest{
			FieldViolations: []*rpc.BadRequest_FieldViolation{
				{
					Field:       invalidValueError.FieldName,
					Description: invalidValueError.Error(),
					Reason:      reason,
				},
			},
		},
	)

	if errorStatus != nil {
		return &articlesv1.CreateArticleResponse{
			Request: request,
			Status:  errorStatus,
		}
	}

	return &articlesv1.CreateArticleResponse{
		Request: request,
		Status: &rpc.Status{
			Code:    int32(rpc.Code_INVALID_ARGUMENT),
			Message: invalidValueError.Error(),
			Details: details,
		},
	}
}

func Create(
	request *articlesv1.CreateArticleRequest,
) *articlesv1.CreateArticleResponse {
	article, err := db.CreateArticle(
		request.GetBody(),
		request.GetTitle(),
	)

	if err == nil {
		createdAt := article.CreatedAt.Unix()

		return &articlesv1.CreateArticleResponse{
			Request:   request,
			CreatedAt: &createdAt,
			Id:        &article.ID,
			Status:    &rpc.Status{Code: int32(rpc.Code_OK)},
		}
	}

	response := handleInvalidValueError(err, request)

	if response == nil {
		response = handleDuplicateKeyError(err, request)
	}

	if response == nil {
		response = handleDefaultError(err, request)
	}

	return response
}
