package handlers

import (
	"net/http"

	"github.com/RivasCVA/gpt-messenger/webapp-server/pkg/models"
	"github.com/gin-gonic/gin"
)

func (h handler) GetUser(c *gin.Context) {
	info, err := authenticateUser(c.Request.Header)
	if err != nil {
		c.IndentedJSON(http.StatusUnauthorized, jsonMessage(err.Error()))
		return
	}

	var user *models.User

	email := info.Email
	exists, err := h.db.UserExists(email)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, jsonMessage(err.Error()))
		return
	}
	if !exists {
		c.IndentedJSON(http.StatusNotFound, jsonMessage("user not found"))
		return
	}
	if user, err = h.db.GetUser(email); err != nil {
		c.IndentedJSON(http.StatusInternalServerError, jsonMessage(err.Error()))
		return
	}
	
	c.IndentedJSON(http.StatusOK, user)
}

func (h handler) AddUser(c *gin.Context) {
	info, err := authenticateUser(c.Request.Header)
	if err != nil {
		c.IndentedJSON(http.StatusUnauthorized, jsonMessage(err.Error()))
		return
	}

	var newUser models.NewUser

	if err := c.BindJSON(&newUser); err != nil {
		c.IndentedJSON(http.StatusBadRequest, jsonMessage(err.Error()))
		return
	}

	email := info.Email
	phone := newUser.Phone
	createdUser, err := h.db.CreateUser(email, phone)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, jsonMessage(err.Error()))
		return
	}

	c.IndentedJSON(http.StatusCreated, createdUser)
}

func (h handler) UpdateUser(c *gin.Context) {
	info, err := authenticateUser(c.Request.Header)
	if err != nil {
		c.IndentedJSON(http.StatusUnauthorized, jsonMessage(err.Error()))
		return
	}

	var user models.User

	if err := c.BindJSON(&user); err != nil {
		c.IndentedJSON(http.StatusBadRequest, jsonMessage(err.Error()))
		return
	}

	email := info.Email
	updatedUser, err := h.db.UpdateUser(email, user)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, jsonMessage(err.Error()))
		return
	}

	c.IndentedJSON(http.StatusAccepted, updatedUser);
}
