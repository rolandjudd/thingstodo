package server

import (
	"github.com/codegangsta/martini-contrib/binding"
	"github.com/codegangsta/martini-contrib/cors"
	"github.com/codegangsta/martini-contrib/render"
	"github.com/go-martini/martini"
	"github.com/rolandjudd/thingstodo/controllers"
	"github.com/rolandjudd/thingstodo/db"
	"github.com/rolandjudd/thingstodo/models"
)

func NewServer(databaseName string) *martini.ClassicMartini {
	m := martini.Classic()

	// Setup middleware
	m.Use(db.DB(databaseName))
	m.Use(render.Renderer())
	m.Use(cors.Allow(&cors.Options{
		AllowOrigins:     []string{"http://localhost*"},
		AllowMethods:     []string{"POST", "GET"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Setup routes
	m.Get(`/events`, controllers.GetAllEvents)
	m.Get(`/events/:id`, controllers.GetEvent)
	m.Post(`/events`, binding.Json(models.Event{}), binding.ErrorHandler, controllers.AddEvent)

	// TODO Update, Delete for events
	//m.Put(`/events/:id`, UpdateEvent)
	//m.Delete(`/events/:id`, DeleteEvent)

	// Add the router action

	return m
}
