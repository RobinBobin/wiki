package gin

import (
	"embed"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"path/filepath"
	"strings"

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

func must(err error) {
	if err != nil {
		log.Fatalln(err)
	}
}

//go:embed all:dist/*
var embeddedDist embed.FS

func SetupGin(server *http.Server) {
	dist, err := static.EmbedFolder(embeddedDist, "dist")

	must(err)

	router := gin.Default()

	must(router.SetTrustedProxies(nil))

	router.GET("/ws", WSHandler)
	router.Use(static.Serve("/", dist))
	router.Use(addExtensionToDist)

	server.Addr = ":8080"
	server.Handler = router

	err = server.ListenAndServe()

	if err == http.ErrServerClosed {
		log.Println(err)
	} else if err != nil {
		log.Fatalln(err)
	}
}
