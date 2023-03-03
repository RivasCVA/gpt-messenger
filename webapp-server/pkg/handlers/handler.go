package handlers

import (
	"github.com/RivasCVA/gpt-messenger/webapp-server/pkg/db"
	"github.com/gin-gonic/gin"
)

type handler struct {
	db *db.MessengerDB
}

func New(db *db.MessengerDB) handler {
	return handler{db}
}

/* Create a gin JSON message response. */
func jsonMessage(message string) gin.H {
	return gin.H{"message": message}
}
