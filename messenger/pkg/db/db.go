package db

import (
	"fmt"
	"log"
	"os"

	"github.com/go-pg/pg/v10"
)

type MessengerDB struct {
	*pg.DB
}

func New() *MessengerDB {
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	name := os.Getenv("DB_NAME")

	db := pg.Connect(&pg.Options{
		Addr: fmt.Sprintf("%s:%s", host, port),
		User: user,
		Password: password,
		Database: name,
	})

	if _, err := db.Exec("SELECT 1"); err != nil {
		log.Fatal("error connecting to database")
	}

	return &MessengerDB{db}
}
