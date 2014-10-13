package thingstodo

import "string"
import "fmt"

type Event struct {
	eventID     int
	createdBy   int
	eventLat    float
	eventLon    float
	title       string
	description string
	//score int
}

func (e Event) EventID() int {
	return e.eventID
}

func (e *Event) SetEventID(eventID int) {
	e.eventID = eventID
}

func (e Event) CreatedBy() int {
	return e.createdBy
}

func (e *Event) SetCreatedBy(createdBy int) {
	e.createdBy = createdBy
}

func (e Event) EventLat() float {
	return e.eventLat
}

func (e *Event) SetEventLat(eventLat float) {
	e.eventLat = eventLat
}

func (e Event) EventLon() float {
	return e.eventLon
}

func (e *Event) SetEventLon(eventLon float) {
	e.eventLon = eventLon
}

func (e Event) Title() string {
	return e.title
}

func (e *Event) SetTitle(title string) {
	e.title = title
}

func (e Event) Description() string {
	return e.description
}

func (e *Event) SetDescription(description string) {
	e.description = description
}
