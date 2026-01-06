package db

import (
	"os"
	"path/filepath"
	"wiki/utils"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

func open() {
	baseDir, err := os.UserConfigDir()
	utils.Must(err)

	appDir := filepath.Join(baseDir, "wiki")

	err = os.MkdirAll(appDir, 0750)
	utils.Must(err)

	dsn := filepath.Join(appDir, "sqlite.db")

	db, err = gorm.Open(sqlite.Open(dsn), &gorm.Config{
		TranslateError: true,
	})

	utils.Must(err)
}
