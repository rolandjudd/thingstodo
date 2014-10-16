package controllers

import "github.com/codegangsta/martini-contrib/render"
import "gopkg.in/mgo.v2"
import "gopkg.in/mgo.v2/bson"
import "thingstodo/models"

func GetAllEvents(db *mgo.Database, r render.Render)  {

	// Query All
	var events []models.Event
	err := db.C("events").Find(bson.M{}).All(&events)
	if err != nil {
		panic(err)
	}

	r.JSON(200, events)
}
