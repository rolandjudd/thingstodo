package main

import "github.com/go-martini/martini"
import "github.com/codegangsta/martini-contrib/render"

import "thingstodo/controllers"
import "thingstodo/db"

func main() {

	m := martini.Classic()

	// Setup middleware
	m.Use(db.DB())
	m.Use(render.Renderer())

	// Setup routes
	m.Get(`/events`, controllers.GetAllEvents)
	m.Get(`/events/:id`, controllers.GetEvent)

	// TODO Create, Update, Delete for events
	//m.Post(`/events`, AddEvent)
	//m.Put(`/events/:id`, UpdateEvent)
	//m.Delete(`/events/:id`, DeleteEvent)

	// Add the router action
	m.Run()
}
