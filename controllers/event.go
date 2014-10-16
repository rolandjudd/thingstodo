package controllers

import "github.com/codegangsta/martini-contrib/render"
import "gopkg.in/mgo.v2"
import "thingstodo/models"
import "encoding/json"

func GetAllEvents(db *mgo.Database, r render.Render) string {
	e := models.Event{}
	e.SetTitle("Pub Crawl")
	e.SetDescription("Testing Descripting")
	bytes, _  := json.Marshal(e)
	return string(bytes)
}
