package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
)

func main() {
	server := &http.Server{}

	go setupGin(server)

	handleShutdown(server)
}

func handleShutdown(server *http.Server) {
	quit := make(chan os.Signal, 1)

	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	log.Printf("Shutdown requested (%v)...", <-quit)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Fatalln(err)
	}

	log.Println("Server exited.")
}

func setupGin(server *http.Server) {
	router := gin.Default()

	router.SetTrustedProxies(nil)

	router.GET("/", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "Hello from 🍹!")
	})

	server.Addr = ":8080"
	server.Handler = router

	err := server.ListenAndServe()

	if err == http.ErrServerClosed {
		log.Println(err)
	} else if err != nil {
		log.Fatalln(err)
	}
}
