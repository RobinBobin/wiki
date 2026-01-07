package gin

import (
	"embed"
	"log"
	"net/http"

	"wiki/gin/ws"
	"wiki/utils"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

//go:embed all:dist/*
var embeddedDist embed.FS

var httpServer = http.Server{}

func Setup() {
	defer utils.HandlePanic()

	utils.AddExitHandler(shutdown)

	dist, err := static.EmbedFolder(embeddedDist, "dist")

	utils.Must(err)

	router := gin.Default()

	utils.Must(router.SetTrustedProxies(nil))

	router.GET("/ws", ws.GetWS)
	router.Use(static.Serve("/", dist))
	router.Use(addExtension)

	httpServer.Addr = ":8080"
	httpServer.Handler = router

	err = httpServer.ListenAndServe()

	log.Println(err)
}
