package main

import (
	"github.com/rolandjudd/thingstodo/server"
)

func main() {
	//Create a new server object and run it
	server := server.NewServer("thingstodo")
	server.Run()
}
