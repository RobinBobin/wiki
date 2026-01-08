package article

import (
	"wiki/db"
	dberrors "wiki/db/errors"
	"wiki/gen/google/rpc"
	articlesv1 "wiki/gen/wiki/articles/v1"
	"wiki/utils"
)

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

	invalidValueError, ok := err.(*dberrors.InvalidValueError)

	if ok {
		details, errorStatus := utils.PackToAny(
			&rpc.ErrorInfo{
				Reason: rpc.Code_name[int32(rpc.Code_INVALID_ARGUMENT)],
			},
			&rpc.BadRequest{
				FieldViolations: []*rpc.BadRequest_FieldViolation{
					{
						Field:       invalidValueError.FieldName,
						Description: invalidValueError.Error(),
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

	return nil
}
