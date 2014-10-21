package main

import (
	"github.com/codegangsta/martini-contrib/binding"
	"github.com/codegangsta/martini-contrib/render"
	"github.com/go-martini/martini"
	"github.com/rolandjudd/thingstodo/controllers"
	"github.com/rolandjudd/thingstodo/db"
	"github.com/rolandjudd/thingstodo/models"
)

func main() {

	m := martini.Classic()

	// Setup middleware
	m.Use(db.DB())
	m.Use(render.Renderer())

	// Setup routes
	m.Get(`/events`, controllers.GetAllEvents)
	m.Get(`/events/:id`, controllers.GetEvent)
	m.Post(`/events`, binding.Json(models.Event{}), binding.ErrorHandler, controllers.AddEvent)

	// TODO Update, Delete for events
	//m.Put(`/events/:id`, UpdateEvent)
	//m.Delete(`/events/:id`, DeleteEvent)

	// Add the router action
	m.Run()
}
