package db

import (
	dberrors "wiki/db/errors"

	"gorm.io/gorm"
)

type article struct {
	gorm.Model

	Body  string
	ID    uint32 `gorm:"primarykey"`
	Title string `gorm:"type:text COLLATE NOCASE;uniqueIndex"`
}

func (article *article) BeforeCreate(
	tx *gorm.DB,
) error {
	var invalidFieldName string

	if len(article.Body) == 0 {
		invalidFieldName = "body"
	} else if len(article.Title) == 0 {
		invalidFieldName = "title"
	} else {
		return nil
	}

	return &dberrors.InvalidValueError{
		FieldName: invalidFieldName,
	}
}
