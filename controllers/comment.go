package controllers

import (
	"github.com/codegangsta/martini-contrib/render"
	"github.com/go-martini/martini"
	"github.com/rolandjudd/thingstodo/models"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"time"
)

// Called on a GET to /events/:id/comments
// Returns list of all comments under :id
func GetAllComments(db *mgo.Database, r render.Render, p martini.Params) {
	var eventId bson.ObjectId
	var comments []models.Comment

	if bson.IsObjectIdHex(p["event_id"]) {
		eventId = bson.ObjectIdHex(p["event_id"])
	} else {
		r.JSON(400, "Bad Request: Invalid ObjectId")
		return
	}

	err := db.C("comments").Find(bson.M{"event_id": eventId}).All(&comments)

	if err != nil {
		panic(err)
	}

	r.JSON(200, comments)

}

// Called on a POST to /events/:id/comments
// Assuming valid comment; Adds the comment under the given id
func AddComment(db *mgo.Database, r render.Render, comment models.Comment, p martini.Params) {
	var eventId bson.ObjectId

	// Create a unique id
	comment.Id = bson.NewObjectId()

	if bson.IsObjectIdHex(p["event_id"]) {
		eventId = bson.ObjectIdHex(p["event_id"])
	} else {
		r.JSON(400, "Bad Request: Invalid Event ID")
		return
	}

	comment.EventId = eventId

	// TODO Should be the user Id
	comment.CreatedBy = bson.NewObjectId()
	comment.CreatedAt = time.Now().UTC()

	err := db.C("comments").Insert(comment)
	if err != nil {
		panic(err)
	}

	r.JSON(201, comment)
}
