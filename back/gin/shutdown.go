package gin

import (
	"context"
	"log"
	"time"
)

func shutdown() {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err := httpServer.Shutdown(ctx)

	if err == nil {
		log.Println("🍸 shut down.")
	} else {
		log.Println("🍸 shut down:", err)
	}
}
