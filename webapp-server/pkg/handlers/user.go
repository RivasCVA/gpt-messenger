package handlers

import (
	"net/http"

	"github.com/RivasCVA/gpt-messenger/webapp-server/pkg/models"
	"github.com/gin-gonic/gin"
)

func (h handler) GetUserInfo(c *gin.Context) {
	info, err := authenticateUser(c.Request.Header)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, jsonMessage(err.Error()))
		return
	}

	var usr *models.User
	email := info.Email
	exists, err := h.db.UserExists(email)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, jsonMessage(err.Error()))
		return
	} else if !exists {
		c.IndentedJSON(http.StatusOK, models.UserNotFound{
			NotFound: true,
			Email: email,
		})
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
	info, err := authenticateUser(c.Request.Header)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, jsonMessage(err.Error()))
		return
	}

	var newUser models.NewUser

	if err := c.BindJSON(&newUser); err != nil {
		c.IndentedJSON(http.StatusInternalServerError, jsonMessage(err.Error()))
		return
	}

	email := info.Email
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
