package db

import (
	"fmt"
)

func SearchArticles(query string) []article {
	var articles []article

	db.
		Select("id, title, body").
		Where("LOWER(title) like LOWER(?)", fmt.Sprintf("%v%%", query)).
		Limit(10).
		Order("title").
		Find(&articles)

	return articles
}
