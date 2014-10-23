package models

import (
	"github.com/codegangsta/martini-contrib/binding"
	"gopkg.in/mgo.v2/bson"
	"net/http"
	"time"
)

type Event struct {
	Id          bson.ObjectId `json:"id,omitempty" bson:"_id,omitempty"`
	Title       string        `json:"title" bson:"title"`
	Description string        `json:"description" bson:"description"`
	Coordinates []float64     `json:"coordinates" bson:"coordinates"`
	CreatedBy   bson.ObjectId `json:"created_by" bson:"created_by"`
	CreatedAt   time.Time     `json:"created_at" bson:"created_at"`
	StartTime   time.Time     `json:"start_time" bson:"start_time"`
	EndTime     time.Time     `json:"end_time" bson:"end_time"`
}

// This method implements binding.Validator and is executed by the binding.Validate middleware
// Should only be called when creating a new event via a POST request
func (event Event) Validate(errors *binding.Errors, req *http.Request) {

	if event.Title == "" {
		errors.Fields["title"] = "This field is required"
	} else if len(event.Title) < 5 {
		errors.Fields["title"] = "Too short, minimum 5 characters"
	} else if len(event.Title) > 50 {
		errors.Fields["title"] = "Too long, maximum 50 characters"
	}

	if event.Description == "" {
		errors.Fields["description"] = "This field is required"
	} else if len(event.Description) < 5 {
		errors.Fields["description"] = "Too short, minimum 5 characters"
	} else if len(event.Title) > 200 {
		errors.Fields["description"] = "Too long, maximum 200 characters"
	}

	// TODO Validate Coordinates

	if event.StartTime.IsZero() {
		errors.Fields["start_time"] = "This field is required"
	}

	if event.EndTime.IsZero() {
		errors.Fields["end_time"] = "This field is required"
	} else if event.EndTime.Before(event.StartTime) {
		errors.Fields["end_time"] = "The end time must be after the start time"
	} else if event.EndTime.Before(time.Now()) {
		errors.Fields["end_time"] = "The event is already over..."
	}

	if len(errors.Fields) > 0 {
		errors.Overall["ValidationError"] = "Form validation failed"
	}

}
