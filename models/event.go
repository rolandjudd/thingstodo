package models

type Event struct {
	eventID     int			`json:"id"`
	createdBy   int			`json:"createdBy"`
	latitude    float32		`json:"latitude"`
	longitude   float32		`json:"longitude"`
	title       string		`json:"title"`
	description string		`json:"description"`
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

func (e Event) Latitude() float32 {
	return e.latitude
}

func (e *Event) SetLatitude(latitude float32) {
	e.latitude = latitude
}

func (e Event) Longitude() float32 {
	return e.longitude
}

func (e *Event) SetLongitude(longitude float32) {
	e.longitude = longitude
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
