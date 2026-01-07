package db

import "gorm.io/gorm"

type article struct {
	gorm.Model

	Body  string
	ID    uint32 `gorm:"primarykey"`
	Title string
}
