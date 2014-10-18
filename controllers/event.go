package controllers

import "github.com/go-martini/martini"
import "github.com/codegangsta/martini-contrib/render"

import "gopkg.in/mgo.v2"
import "gopkg.in/mgo.v2/bson"

import "thingstodo/models"

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
		// TODO Return an error object
		r.JSON(404, "Invalid ObjectId")
		return
	}

	err := db.C("events").Find(bson.M{"_id": id}).One(&event)

	if err != nil {
		panic(err)
	}

	r.JSON(200, event)

}

func AddEvent(db *mgo.Database, r render.Render, event models.Event) {

	// TODO Insert into DB
	r.JSON(200, event)
}
