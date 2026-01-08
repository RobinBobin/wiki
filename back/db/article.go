package db

import (
	"strings"

	"gorm.io/gorm"
	dberrors "wiki/db/errors"
)

type article struct {
	gorm.Model

	Body  string
	ID    uint32 `gorm:"primarykey"`
	Title string `gorm:"uniqueIndex"`
}

func (article *article) BeforeCreate(
	tx *gorm.DB,
) error {
	var invalidFieldName string

	if len(
		strings.TrimSpace(
			article.Body,
		),
	) == 0 {
		invalidFieldName = "body"
	} else if len(strings.TrimSpace(article.Title)) == 0 {
		invalidFieldName = "title"
	} else {
		return nil
	}

	return &dberrors.InvalidValueError{
		FieldName: invalidFieldName,
	}
}
