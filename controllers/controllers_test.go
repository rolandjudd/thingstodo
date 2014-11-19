package controllers_test

import (
	"bytes"
	"encoding/json"
	"github.com/go-martini/martini"
	"github.com/modocache/gory"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
	"github.com/rolandjudd/thingstodo/models"
	"github.com/rolandjudd/thingstodo/server"
	"gopkg.in/mgo.v2"
	"net/http"
	"net/http/httptest"
	"time"
)

/*
Convert JSON data into a slice.
*/
func sliceFromJSON(data []byte) []interface{} {
	var result interface{}
	json.Unmarshal(data, &result)
	return result.([]interface{})
}

/*
Convert JSON data into a map.
*/
func mapFromJSON(data []byte) map[string]interface{} {
	var result interface{}
	json.Unmarshal(data, &result)
	return result.(map[string]interface{})
}

/*
Server unit tests.
*/
var _ = Describe("Server", func() {
	var dbName string
	var request *http.Request
	var recorder *httptest.ResponseRecorder
	var session *mgo.Session
	var err error
	var testServer *martini.ClassicMartini

	BeforeEach(func() {
		// Set up a new server, connected to a test database,
		// before each test.
		dbName = "thingstodo_test"
		session, err = mgo.Dial("mongodb://localhost")
		if err != nil {
			panic(err)
		}
		testServer = server.NewServer(dbName)

		// Record HTTP responses.
		recorder = httptest.NewRecorder()
	})

	AfterEach(func() {
		// Clear the database after each test.
		session.DB(dbName).DropDatabase()
	})

	Describe("GET /events", func() {

		// Set up a new GET request before every test
		// in this describe block.
		BeforeEach(func() {
			request, _ = http.NewRequest("GET", "/events", nil)
		})

		Context("when no events exist", func() {
			It("returns a status code of 200", func() {
				testServer.ServeHTTP(recorder, request)
				Expect(recorder.Code).To(Equal(200))
			})

			It("returns a empty body", func() {
				testServer.ServeHTTP(recorder, request)
				Expect(recorder.Body.String()).To(Equal("null"))
			})
		})

		Context("when events exist", func() {

			// Insert two valid signatures into the database
			// before each test in this context.
			BeforeEach(func() {
				collection := session.DB(dbName).C("events")
				collection.Insert(*gory.Build("event").(*models.Event))
				collection.Insert(*gory.Build("event").(*models.Event))
			})

			It("returns a status code of 200", func() {
				testServer.ServeHTTP(recorder, request)
				Expect(recorder.Code).To(Equal(200))
			})

			It("returns those events in the body", func() {
				testServer.ServeHTTP(recorder, request)

				eventsJSON := sliceFromJSON(recorder.Body.Bytes())
				Expect(len(eventsJSON)).To(Equal(2))

				eventJSON := eventsJSON[0].(map[string]interface{})
				Expect(eventJSON["title"]).To(Equal("Yard Sale!"))
				Expect(eventJSON["description"]).To(Equal("Getting a bunch of old stuff out of the attic!"))
				Expect(eventJSON["category"]).To(Equal("Sale"))
				//Expect(time.Parse(time.RFC3339,eventJSON["start_time"].(string))).To(Equal(time.Date(2999, time.January, 1, 12, 12, 12, 12, time.UTC)))
				//Expect(time.Parse(time.RFC3339,eventJSON["end_time"].(string))).To(Equal(time.Date(2999, time.January, 2, 12, 12, 12, 12, time.UTC)))
			})
		})
	})

	Describe("POST /events", func() {

		Context("with invalid JSON", func() {

			// Create a POST request using JSON from our invalid
			// factory object before each test in this context.
			BeforeEach(func() {
				body, _ := json.Marshal(
					gory.Build("eventAlreadyOver"))
				request, _ = http.NewRequest(
					"POST", "/events", bytes.NewReader(body))
			})

			It("returns a status code of 422", func() {
				testServer.ServeHTTP(recorder, request)
				Expect(recorder.Code).To(Equal(422))
			})
		})

		Context("with valid JSON", func() {

			// Create a POST request with valid JSON from
			// our factory before each test in this context.
			BeforeEach(func() {
				body, _ := json.Marshal(*gory.Build("event").(*models.Event))
				request, _ = http.NewRequest(
					"POST", "/events", bytes.NewReader(body))
			})

			It("returns a status code of 201", func() {
				testServer.ServeHTTP(recorder, request)
				Expect(recorder.Code).To(Equal(201))
			})

			It("returns the inserted event", func() {
				testServer.ServeHTTP(recorder, request)

				eventJSON := mapFromJSON(recorder.Body.Bytes())
				Expect(eventJSON["title"]).To(Equal("Yard Sale!"))
				Expect(eventJSON["description"]).To(Equal("Getting a bunch of old stuff out of the attic!"))
				Expect(eventJSON["category"]).To(Equal("Sale"))
				Expect(time.Parse(time.RFC3339, eventJSON["start_time"].(string))).To(Equal(time.Date(2999, time.January, 1, 12, 12, 12, 12, time.UTC)))
				Expect(time.Parse(time.RFC3339, eventJSON["end_time"].(string))).To(Equal(time.Date(2999, time.January, 2, 12, 12, 12, 12, time.UTC)))
			})
		})
	})

	Describe("GET /events/:id/comments", func() {

		// Insert an event for us to get the comments of before each
		BeforeEach(func() {
			testEvent := *gory.Build("eventCommentTest").(*models.Event)
			collection := session.DB(dbName).C("events")
			collection.Insert(testEvent)
			request, _ = http.NewRequest("GET", "/events/"+testEvent.Id.Hex()+"/comments", nil)
		})

		Context("when no comments exist", func() {
			It("returns a status code of 200", func() {
				testServer.ServeHTTP(recorder, request)
				Expect(recorder.Code).To(Equal(200))
			})

			It("returns a empty body", func() {
				testServer.ServeHTTP(recorder, request)
				Expect(recorder.Body.String()).To(Equal("null"))
			})
		})

		Context("when comments exist", func() {

			// Insert two valid signatures into the database
			// before each test in this context.
			BeforeEach(func() {
				collection := session.DB(dbName).C("comments")
				collection.Insert(*gory.Build("comment").(*models.Comment))
			})

			It("returns a status code of 200", func() {
				testServer.ServeHTTP(recorder, request)
				Expect(recorder.Code).To(Equal(200))
			})

			It("returns those comments in the body", func() {
				testServer.ServeHTTP(recorder, request)

				commentsJSON := sliceFromJSON(recorder.Body.Bytes())
				Expect(len(commentsJSON)).To(Equal(1))

				commentJSON := commentsJSON[0].(map[string]interface{})
				Expect(commentJSON["comment"]).To(Equal("This is a valid comment."))
			})
		})
	})
})
