package handlers

import (
	"errors"
	"strings"

	"github.com/RivasCVA/gpt-messenger/webapp-server/pkg/constants"
	"github.com/RivasCVA/gpt-messenger/webapp-server/pkg/db"
	"github.com/RivasCVA/gpt-messenger/webapp-server/pkg/oauth"
	"github.com/gin-gonic/gin"
)

type handler struct {
	db *db.MessengerDB
}

func New(db *db.MessengerDB) handler {
	return handler{db}
}

// Create a gin JSON message response.
func jsonMessage(message string) gin.H {
	return gin.H{"message": message}
}

// Verifies the token from the source before reading the email.
func getEmailFromJWT(jwt string, source string) (email string, err error) {
	switch strings.ToLower(source) {
	case constants.SOURCE_GOOGLE:
		info, err := oauth.VerifyIDToken(jwt)
		if err != nil {
			return "", err
		}
		return info["email"].(string), nil
	default:
		return "", errors.New("invalid jwt source")
	}
}
