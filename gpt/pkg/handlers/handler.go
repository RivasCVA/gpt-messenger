package handlers

import (
	"github.com/RivasCVA/gpt-messenger/gpt/pkg/openai"
	"github.com/gin-gonic/gin"
)

type handler struct {
	openaiClient *openai.OpenAIClient
}

func New(client *openai.OpenAIClient) handler {
	return handler{client}
}

// Create a gin JSON message response.
func jsonMessage(message string) gin.H {
	return gin.H{"message": message}
}
