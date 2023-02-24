package main

import (
	"context"
	"fmt"
	"os"

	"github.com/RivasCVA/gpt-messenger/gpt/pkg/handlers"
	"github.com/RivasCVA/gpt-messenger/gpt/pkg/openai"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	log "github.com/sirupsen/logrus"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("error loading .env file")
	}

	router := gin.Default()

	openaiClient := openai.New(context.Background())
	handler := handlers.New(openaiClient)

	router.POST("/prompt", handler.ProcessPrompt)

	host := os.Getenv("HOST")
	port := os.Getenv("PORT")
	router.Run(fmt.Sprintf("%s:%s", host, port))
}
