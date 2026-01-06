package gin

import (
	"embed"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"path/filepath"
	"strings"

	"wiki/gin/ws"
	"wiki/globals"
	"wiki/utils"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func addExtensionToDist(ctx *gin.Context) {
	path := ctx.Request.URL.Path

	// It's a root path or already has an extension.
	if path == "/" || strings.Contains(filepath.Base(path), ".") {
		return
	}

	filepath := fmt.Sprintf("dist%v.html", path)

	_, err := fs.Stat(embeddedDist, filepath)

	if err != nil {
		return
	}

	ctx.FileFromFS(filepath, http.FS(embeddedDist))

	ctx.Next()
}

//go:embed all:dist/*
var embeddedDist embed.FS

func Setup() {
	defer utils.HandlePanic()

	dist, err := static.EmbedFolder(embeddedDist, "dist")

	utils.Must(err)

	router := gin.Default()

	utils.Must(router.SetTrustedProxies(nil))

	router.GET("/ws", ws.GetWS)
	router.Use(static.Serve("/", dist))
	router.Use(addExtensionToDist)

	globals.HTTPServer.Addr = ":8080"
	globals.HTTPServer.Handler = router

	err = globals.HTTPServer.ListenAndServe()

	log.Println(err)
}
