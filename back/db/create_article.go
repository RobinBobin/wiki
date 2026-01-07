package db

func CreateArticle(body, title string) (*article, error) {
	article := &article{Body: body, Title: title}

	result := db.Create(article)

	return article, result.Error
}
