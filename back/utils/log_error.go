package utils

import (
	"log"
)

func LogError(err error, tag string) {
	log.Printf("%v error: %v", tag, err)
}
