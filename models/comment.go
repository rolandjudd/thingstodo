package models

import (
	"github.com/codegangsta/martini-contrib/binding"
	"gopkg.in/mgo.v2/bson"
	"net/http"
	"time"
)

type Comment struct {
	Id          bson.ObjectId     `json:"id,omitempty" bson:"_id,omitempty"`
	EventId     bson.ObjectId     `json:"event_id" bson:"event_id"`
	Comment     string            `json:"comment" bson:"comment"`
	CreatedBy   bson.ObjectId     `json:"created_by" bson:"created_by"`
	CreatedAt   time.Time         `json:"created_at" bson:"created_at"`
}

// This method implements binding.Validator and is executed by the binding.Validate middleware
// Should only be called when creating a new comment via a POST request
func (comment Comment) Validate(errors *binding.Errors, req *http.Request) {

	if comment.Comment == "" {
		errors.Fields["comment"] = "This field is required"
	} else if len(comment.Comment) < 5 {
		errors.Fields["comment"] = "Too short, minimum 5 characters"
	} else if len(comment.Comment) > 200 {
		errors.Fields["comment"] = "Too long, maximum 200 characters"
	}
    
	if !comment.EventId.Valid() {
		errors.Fields["event_id"] = "The Event Id is invalid"
	}

	if len(errors.Fields) > 0 {
		errors.Overall["ValidationError"] = "Form validation failed"
	}

}