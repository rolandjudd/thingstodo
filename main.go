package main

import "github.com/go-martini/martini"
import "github.com/codegangsta/martini-contrib/render"

import "thingstodo/controllers"
import "thingstodo/db"

func main() {

	m := martini.Classic()

	// Setup middleware
	//m.Use(martini.Recovery())
	//m.Use(martini.Logger())
	m.Use(db.DB())
	m.Use(render.Renderer())

	// Setup routes
	m.Get(`/event`, controllers.GetAllEvents)
	//r.Get(`/event/:id`, GetEvent)
	//r.Post(`/albums`, AddEvent)
	//r.Put(`/albums/:id`, UpdateEvent)
	//r.Delete(`/albums/:id`, DeleteEvent)

	// Add the router action
	m.Run()
}
