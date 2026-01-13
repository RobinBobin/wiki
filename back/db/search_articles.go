package db

import (
	"fmt"
)

func SearchArticles(query string) []article {
	var articles []article

	db.Select("id, title, body").Where("title like ?", fmt.Sprintf("%v%%", query)).Limit(10).Find(&articles)

	return articles
}
