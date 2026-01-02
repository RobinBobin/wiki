package main

import (
	"net/http"
	"wiki/gin"
)

func main() {
	server := &http.Server{}

	go gin.SetupGin(server)

	handleShutdown(server)
}
