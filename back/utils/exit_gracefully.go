package utils

import (
	"context"
	"log"
	"time"
	"wiki/globals"
)

func ExitGracefully(reason any) {
	log.Printf("App exiting. Reason: %v", reason)

	shutdownGin()
}

func shutdownGin() {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err := globals.HTTPServer.Shutdown(ctx)

	if err == nil {
		log.Println("🍸 shut down.")
	} else {
		log.Println("🍸 shut down: ", err)
	}
}
