package handlers

import (
	"net/http"
	"strings"

	"github.com/RivasCVA/gpt-messenger/gpt/pkg/models"
	"github.com/gin-gonic/gin"
)

func (h handler) ProcessPrompt(c *gin.Context) {
	// Get prompt from request
	var prompt models.GPTPrompt

	if err := c.BindJSON(&prompt); err != nil {
		c.IndentedJSON(http.StatusInternalServerError, jsonMessage(err.Error()))
		return
	}

	// Trim and validate prompt
	text := strings.TrimSpace(prompt.Body)
	if len(text) == 0 {
		c.IndentedJSON(http.StatusInternalServerError, jsonMessage("invalid empty prompt"))
		return
	}

	// Get answer from gpt on prompt
	ans, err := h.openaiClient.GetAnswer(text)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, jsonMessage(err.Error()))
		return
	}

	// Return answer as response
	answer := models.GPTAnswer{
		Body: ans,
	}
	c.IndentedJSON(http.StatusOK, answer)
}
