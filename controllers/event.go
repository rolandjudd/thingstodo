package controllers

import (
	"github.com/codegangsta/martini-contrib/render"
	"github.com/go-martini/martini"
	"github.com/rolandjudd/thingstodo/models"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"time"
)

func GetAllEvents(db *mgo.Database, r render.Render) {

	var events []models.Event
	err := db.C("events").Find(bson.M{}).All(&events)
	if err != nil {
		panic(err)
	}

	r.JSON(200, events)
}

func GetEvent(db *mgo.Database, r render.Render, p martini.Params) {

	var id bson.ObjectId
	var event models.Event

	if bson.IsObjectIdHex(p["id"]) {
		id = bson.ObjectIdHex(p["id"])
	} else {
		r.JSON(400, "Bad Request: Invalid ObjectId")
		return
	}

	err := db.C("events").FindId(id).One(&event)

	// TODO Check for 404

	if err != nil {
		panic(err)
	}

	r.JSON(200, event)

}

func AddEvent(db *mgo.Database, r render.Render, event models.Event) {

	// Create a unique id
	event.Id = bson.NewObjectId()

	// TODO Should be the user Id
	event.CreatedBy = bson.NewObjectId()
	event.CreatedAt = time.Now().UTC()

	err := db.C("events").Insert(event)
	if err != nil {
		panic(err)
	}

	r.JSON(201, event)
}
