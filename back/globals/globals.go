package globals

import (
	"net/http"
	"os"
)

var HTTPServer = &http.Server{}
var Quit chan os.Signal = make(chan os.Signal, 1)
