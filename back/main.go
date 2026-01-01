package main

import (
	"net/http"
)

func main() {
	server := &http.Server{}

	go setupGin(server)

	handleShutdown(server)
}
