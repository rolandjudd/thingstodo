package controllers

import (
	"github.com/codegangsta/martini-contrib/render"
	"github.com/martini-contrib/oauth2"
	"net/http"
)

// Get the logged in user
func GetLoggedInUser(tokens oauth2.Tokens, r render.Render) { 
	
	var url = "https://www.googleapis.com/plus/v1/people/me?access_token=" + tokens.Access()
	
	resp, err := http.Get(url)
	if err != nil {
		panic(err)
	}

	r.JSON(200, resp)

}
