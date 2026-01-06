package main

import (
	"os/signal"
	"syscall"
	"wiki/db"
	"wiki/gin"
	"wiki/utils"
)

func handleExit() {
	signal.Notify(utils.Quit, syscall.SIGINT, syscall.SIGTERM)

	reason := <-utils.Quit

	if reason != nil {
		utils.ExitGracefully(reason)
	}
}

func main() {
	defer utils.HandlePanic()

	db.Setup()

	go gin.Setup()

	handleExit()
}
