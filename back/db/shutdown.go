package db

import "log"

func shutdown() {
	if db == nil {
		log.Println("SQLite not open.")

		return
	}

	sqldb, err := db.DB()

	if err != nil {
		log.Println("Can't close SQLite:", err)

		return
	}

	err = sqldb.Close()

	if err == nil {
		log.Println("SQLite closed.")
	} else {
		log.Println("SQLite closed:", err)
	}
}
