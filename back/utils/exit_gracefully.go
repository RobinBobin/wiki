package utils

import (
	"log"
)

type exitHandler = func()

var exitHandlers = []exitHandler{}

func AddExitHandler(handler exitHandler) {
	exitHandlers = append(exitHandlers, handler)
}

func ExitGracefully(reason any) {
	log.Printf("App exiting. Reason: %v", reason)

	for _, exitHandler := range exitHandlers {
		exitHandler()
	}
}
