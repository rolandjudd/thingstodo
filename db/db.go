package db

import "github.com/go-martini/martini"
import "gopkg.in/mgo.v2"

// DB Returns a martini.Handler
func DB() martini.Handler {
    session, err := mgo.Dial("mongodb://localhost")
    if err != nil {
        panic(err)
    }

    return func(c martini.Context) {
        s := session.Clone()
        c.Map(s.DB("thingstodo"))
        defer s.Close()
        c.Next()
    }
}