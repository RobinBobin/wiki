package ws

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"google.golang.org/protobuf/proto"

	envelopev1 "wiki/gen/wiki/envelope/v1"
	"wiki/utils"
)

func handleWebSocket(connection *websocket.Conn) {
	cleanup := func() {
		err := connection.Close()

		if err != nil {
			utils.LogError(err, "Close ws")
		}
	}

	defer cleanup()

	for {
		_, clientPacket, err := connection.ReadMessage()

		if err != nil {
			utils.LogError(err, "Read from ws")

			break
		}

		clientEnvelope := &envelopev1.ClientEnvelope{}

		err = proto.Unmarshal(clientPacket, clientEnvelope)

		if err != nil {
			utils.LogError(err, "Unmarshal request")

			break
		}

		serverEnvelope := route(clientEnvelope)

		if serverEnvelope == nil {
			continue
		}

		serverPacket, err := proto.Marshal(serverEnvelope)

		if err != nil {
			utils.LogError(err, "Marshal response")

			break
		}

		err = connection.WriteMessage(websocket.BinaryMessage, serverPacket)

		if err != nil {
			utils.LogError(err, "Write to ws")
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
		utils.LogError(err, "Upgrade to ws")

		return
	}

	go handleWebSocket(connection)
}
