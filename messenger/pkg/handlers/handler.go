package handlers

import "github.com/RivasCVA/gpt-messenger/messenger/pkg/db"

type handler struct {
	db *db.MessengerDB
}

func New(db *db.MessengerDB) handler {
	return handler{db}
}
