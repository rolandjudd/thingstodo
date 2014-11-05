package controllers_test

import (
	"github.com/modocache/gory"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
	"github.com/rolandjudd/thingstodo/models"
	"gopkg.in/mgo.v2/bson"
	"testing"
	"time"
)

func TestControllers(t *testing.T) {
	defineFactories()
	RegisterFailHandler(Fail)
	RunSpecs(t, "Controllers Suite")
}

func defineFactories() {
	validID := bson.NewObjectId()

	gory.Define("event", models.Event{},
		func(factory gory.Factory) {
			factory["Title"] = "Yard Sale!"
			factory["Description"] = "Getting a bunch of old stuff out of the attic!"
			factory["Category"] = "Sale"
			factory["CreatedBy"] = bson.NewObjectId()
			factory["StartTime"] = time.Date(2999, time.January, 1, 12, 12, 12, 12, time.UTC)
			factory["EndTime"] = time.Date(2999, time.January, 2, 12, 12, 12, 12, time.UTC)
		})

	gory.Define("eventAlreadyOver", models.Event{},
		func(factory gory.Factory) {
			factory["Title"] = "Pubcrawl!"
			factory["Description"] = "Come to the Ruck!"
			factory["Category"] = "Pubcrawl"
			factory["CreatedBy"] = bson.NewObjectId()
			factory["StartTime"] = time.Now().UTC()
			factory["EndTime"] = time.Now().UTC()
		})

	gory.Define("eventTitleTooShort", models.Event{},
		func(factory gory.Factory) {
			factory["Title"] = "Test"
			factory["Description"] = "Trying ThingsToDo"
			factory["Category"] = "Other"
			factory["CreatedBy"] = bson.NewObjectId()
			factory["StartTime"] = time.Date(2999, time.January, 1, 12, 12, 12, 12, time.UTC)
			factory["EndTime"] = time.Date(2999, time.January, 2, 12, 12, 12, 12, time.UTC)
		})

	gory.Define("eventCommentTest", models.Event{},
		func(factory gory.Factory) {
			factory["Title"] = "Yard Sale!"
			factory["Description"] = "Getting a bunch of old stuff out of the attic!"
			factory["Category"] = "Sale"
			factory["Id"] = validID
			factory["CreatedBy"] = bson.NewObjectId()
			factory["StartTime"] = time.Date(2999, time.January, 1, 12, 12, 12, 12, time.UTC)
			factory["EndTime"] = time.Date(2999, time.January, 2, 12, 12, 12, 12, time.UTC)
		})

	gory.Define("comment", models.Comment{},
		func(factory gory.Factory) {
			factory["Comment"] = "This is a valid comment."
			factory["EventId"] = validID
		})

}
