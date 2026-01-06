package db

import (
	"wiki/utils"

	"gorm.io/gorm"
)

var db *gorm.DB

func Setup() {
	utils.AddExitHandler(shutdown)

	open()

	utils.Must(db.AutoMigrate(&Article{}))
}
