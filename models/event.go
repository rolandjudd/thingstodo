package models

import "gopkg.in/mgo.v2/bson"

type Event struct {
	Id          bson.ObjectId `json:"id,omitempty" bson:"_id,omitempty"`
	CreatedBy   bson.ObjectId `json:"createdBy" bson:"createdBy"`
	Title       string        `json:"title" bson:"title"`
	Description string        `json:"description" bson:"description"`
	Coordinates []float64     `bson:"coordinates"`
	// TODO score
}
