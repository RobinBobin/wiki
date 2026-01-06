package utils

import "wiki/globals"

func HandlePanic() {
	reason := recover()

	if reason == nil {
		return
	}

	ExitGracefully(reason)

	close(globals.Quit)
}
