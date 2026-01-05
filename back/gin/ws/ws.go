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
		_, packet, err := connection.ReadMessage()

		if err != nil {
			handleError(err, "Read")
			break
		}

		envelope := &envelopev1.Envelope{}

		err = proto.Unmarshal(packet, envelope)

		if err != nil {
			handleError(err, "Unmarshal")
			break
		}

		processEnvelope(envelope)
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
