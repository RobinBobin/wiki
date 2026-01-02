package gin

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{}

func handleWebSocket(connection *websocket.Conn) {
	cleanup := func() {
		err := connection.Close()

		if err != nil {
			log.Println("Close error:")
		}
	}

	defer cleanup()

	for {
		messageType, packet, err := connection.ReadMessage()

		if err != nil {
			log.Println("Read error:", err)
			break
		}

		log.Println("Received:", string(packet))

		if err := connection.WriteMessage(messageType, packet); err != nil {
			log.Println("Write error:", err)

			break
		}
	}
}

func WSHandler(ctx *gin.Context) {
	connection, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)

	if err != nil {
		log.Println("Upgrade error:", err)
		return
	}

	go handleWebSocket(connection)
}
