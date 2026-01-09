package db

import "strings"

func CreateArticle(body, title string) (*article, error) {
	article := &article{
		Body:  strings.TrimSpace(body),
		Title: strings.TrimSpace(title),
	}

	result := db.Create(article)

	return article, result.Error
}
