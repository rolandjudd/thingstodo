package main

import (
    "github.com/rolandjudd/thingstodo/server"
)

func main() {
    server := server.NewServer("thingstodo")
	server.Run()
}
