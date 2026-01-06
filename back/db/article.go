package db

import (
	"gorm.io/gorm"
)

type Article struct {
	gorm.Model

	Body  string
	Title string
}

func CreateArticle(body, title string) (uint, error) {
	article := Article{Body: body, Title: title}

	result := db.Create(&article)

	return article.ID, result.Error
}
