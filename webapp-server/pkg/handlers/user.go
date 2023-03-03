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

	var usr *models.User
	exists, err := h.db.UserExists(email)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, jsonMessage(err.Error()))
		return
	} else if !exists {
		c.IndentedJSON(http.StatusNotFound, jsonMessage("user does not exist"))
		return
	} else if usr, err = h.db.GetUser(email); err != nil {
		c.IndentedJSON(http.StatusInternalServerError, jsonMessage(err.Error()))
		return
	}
	
	c.IndentedJSON(http.StatusOK, models.UserInfo{
		Email: usr.Email,
		Phone: usr.Phone,
		Subscribed: usr.Subscribed,
	})
}

func (h handler) AddNewUser(c *gin.Context) {
	var newUser models.NewUser

	if err := c.BindJSON(&newUser); err != nil {
		c.IndentedJSON(http.StatusInternalServerError, jsonMessage(err.Error()))
		return
	}

	email, err := getEmailFromJWT(newUser.JWT, newUser.Source)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, jsonMessage(err.Error()))
		return
	}

	usr, err := h.db.CreateUser(email, newUser.Phone)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, jsonMessage(err.Error()))
		return
	}

	c.IndentedJSON(http.StatusCreated, models.UserInfo{
		Email: usr.Email,
		Phone: usr.Phone,
		Subscribed: usr.Subscribed,
	})
}
