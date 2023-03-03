package handlers

import (
	"net/http"

	"github.com/RivasCVA/gpt-messenger/webapp-server/pkg/models"
	"github.com/gin-gonic/gin"
)

func (h handler) GetUserInfo(c *gin.Context) {
	id := c.Param("id")

	usr, err := h.db.GetUser(id)
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
