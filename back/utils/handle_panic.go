package utils

import "os"

var Quit chan os.Signal = make(chan os.Signal, 1)

func HandlePanic() {
	reason := recover()

	if reason == nil {
		return
	}

	ExitGracefully(reason)

	close(Quit)
}
