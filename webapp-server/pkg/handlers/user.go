package handlers

import (
	"net/http"

	"github.com/RivasCVA/gpt-messenger/webapp-server/pkg/models"
	"github.com/gin-gonic/gin"
)

func (h handler) GetUserInfo(c *gin.Context) {
	var request models.Request

	if err := c.BindJSON(&request); err != nil {
		c.IndentedJSON(http.StatusInternalServerError, jsonMessage(err.Error()))
		return
	}

	email, err := getEmailFromJWT(request.JWT, request.Source)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, jsonMessage(err.Error()))
		return
	}
	
	usr, err := h.db.GetUser(email)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, jsonMessage(err.Error()))
		return
	}

	c.IndentedJSON(http.StatusOK, models.UserInfo{
		Email: usr.Email,
		Phone: usr.Phone,
		Subscribed: usr.Subscribed,
	})
}
