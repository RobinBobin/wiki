package main

import (
	"os/signal"
	"syscall"
	"wiki/gin"
	"wiki/globals"
	"wiki/utils"
)

func handleExit() {
	signal.Notify(globals.Quit, syscall.SIGINT, syscall.SIGTERM)

	reason := <-globals.Quit

	if reason != nil {
		utils.ExitGracefully(reason)
	}
}

func main() {
	defer utils.HandlePanic()

	go gin.Setup()

	handleExit()
}
