package main

import (
	"fmt"
	"os"

	"github.com/RivasCVA/gpt-messenger/messenger/pkg/db"
	"github.com/RivasCVA/gpt-messenger/messenger/pkg/handlers"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	log "github.com/sirupsen/logrus"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("error loading .env file")
	}

	router := gin.Default()
	database := db.New()
	handler := handlers.New(database)

	router.POST("/message", handler.ProcessMessage)

	host := os.Getenv("HOST")
	port := os.Getenv("PORT")
	router.Run(fmt.Sprintf("%s:%s", host, port))
}
