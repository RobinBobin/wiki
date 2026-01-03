package gin

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(_ *http.Request) bool {
		return true
	},
}

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

		var verb string

		if messageType == websocket.BinaryMessage {
			verb = "%v"
		} else {
			verb = "%s"
		}

		log.Print("Received: ", fmt.Sprintf(verb, packet))

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
