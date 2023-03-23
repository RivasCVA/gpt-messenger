package handlers

import (
	"net/http"

	"github.com/RivasCVA/gpt-messenger/webapp-server/pkg/models"
	"github.com/gin-gonic/gin"
)

func (h handler) Login(c *gin.Context) {
	info, err := authenticateUser(c.Request.Header)
	if err != nil {
		c.IndentedJSON(http.StatusUnauthorized, jsonMessage(err.Error()))
		return
	}

	email := info.Email
	exists, err := h.db.UserExists(email)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, jsonMessage(err.Error()))
		return
	}

	c.IndentedJSON(http.StatusAccepted, models.LoginStatus{
		Exists: exists,
		Email: email,
	})
}
