package ws

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"google.golang.org/protobuf/proto"

	// articlesv1 "wiki/gen/wiki/articles/v1"
	envelopev1 "wiki/gen/wiki/envelope/v1"
)

func handleError(err error, tag string) {
	log.Print(fmt.Sprint(tag, " error: ", err))
}

func handleWebSocket(connection *websocket.Conn) {
	cleanup := func() {
		err := connection.Close()

		if err != nil {
			handleError(err, "Close")
		}
	}

	defer cleanup()

	for {
		_, clientPacket, err := connection.ReadMessage()

		if err != nil {
			handleError(err, "Read")
			break
		}

		clientEnvelope := &envelopev1.ClientEnvelope{}

		err = proto.Unmarshal(clientPacket, clientEnvelope)

		if err != nil {
			handleError(err, "Unmarshal")
			break
		}

		serverEnvelope := route(clientEnvelope)

		if serverEnvelope != nil {
			serverPacket, err := proto.Marshal(serverEnvelope)

			if err != nil {
				handleError(err, "Marshal")
			}

			err = connection.WriteMessage(websocket.BinaryMessage, serverPacket)

			handleError(err, "Write")
		}
	}
}

func GetWS(ctx *gin.Context) {
	upgrader := websocket.Upgrader{
		CheckOrigin: func(_ *http.Request) bool {
			return true
		},
	}

	connection, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)

	if err != nil {
		handleError(err, "Upgrade")
		return
	}

	go handleWebSocket(connection)
}
