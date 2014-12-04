package controllers

import (
	"github.com/codegangsta/martini-contrib/render"
	"github.com/go-martini/martini"
	"github.com/rolandjudd/thingstodo/models"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"time"
)

// Called on a GET to /events
// Returns a list of all events
func GetAllEvents(db *mgo.Database, r render.Render) {

	var events []models.Event

	// Only display events that haven't ended, and sort by end_time
	err := db.C("events").Find(bson.M{
		"end_time": bson.M{
			"$gt": time.Now().UTC(),
		},
	}).Sort("start_time").All(&events)

	if err != nil {
		panic(err)
	}

	r.JSON(200, events)
}

// Called on a Get to /events/:id
// Returns a single event with the id :id
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

// Called on a POST to /events
// Assuming valid event; adds the given event
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
