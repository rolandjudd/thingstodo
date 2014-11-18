package config

import (
	"github.com/codegangsta/envy/lib"
	"os"
)

type Config struct {
	Client_Id     string
	Client_Secret string
	OAuth_Callback string
	Cookie_Auth   string
	Cookie_Enc    string
}

func GetConfig() *Config {

	// Load .env file
	envy.Bootstrap()

	c := new(Config)

	c.Client_Id = os.Getenv("CLIENT_ID")
	if c.Client_Id == "" {
		panic("CLIENT_ID must be set in the .env file")
	}

	c.Client_Secret = os.Getenv("CLIENT_SECRET")
	if c.Client_Secret == "" {
		panic("CLIENT_SECRET must be set in the .env file")
	}

	c.OAuth_Callback = os.Getenv("OAUTH_CALLBACK")
	if c.OAuth_Callback == "" {
		panic("OAUTH_CALLBACK must be set in the .env file")
	}

	c.Cookie_Auth = os.Getenv("COOKIE_AUTH")
	if c.Cookie_Auth == "" {
		panic("COOKIE_AUTH must be set in the .env file")
	}

	c.Cookie_Enc = os.Getenv("COOKIE_ENC")
	if c.Cookie_Enc == "" {
		panic("COOKIE_ENC must be set in the .env file")
	}

	return c
}
