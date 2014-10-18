package models

import "github.com/codegangsta/martini-contrib/binding"

import "gopkg.in/mgo.v2/bson"

import "net/http"

type Event struct {
	Id          bson.ObjectId `json:"id,omitempty" bson:"_id,omitempty"`
	CreatedBy   bson.ObjectId `json:"createdBy" bson:"createdBy"`
	Title       string        `json:"title" bson:"title" binding:"required"`
	Description string        `json:"description" bson:"description" binding:"required"`
	Coordinates []float64     `json:"coordinates" bson:"coordinates" binding:"required"`
	// TODO score
}

// This method implements binding.Validator and is executed by the binding.Validate middleware
func (event Event) Validate(errors *binding.Errors, req *http.Request) {
    
    if len(event.Title) < 5 {
        errors.Fields["title"] = "Too short; minimum 5 characters"
    } else if len(event.Title) > 50 {
        errors.Fields["title"] = "Too long; maximum 50 characters"
    }

    if len(event.Description) < 5 {
        errors.Fields["description"] = "Too short; minimum 5 characters"
    } else if len(event.Title) > 200 {
        errors.Fields["description"] = "Too long; maximum 200 characters"
    }

    // TODO Validate Coordinates

    // TODO binding:"required" should return the json name, not the field name
}
