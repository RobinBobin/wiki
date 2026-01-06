package gin

import (
	"fmt"
	"io/fs"
	"net/http"
	"path/filepath"
	"strings"

	"github.com/gin-gonic/gin"
)

func addExtension(ctx *gin.Context) {
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
