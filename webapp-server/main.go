package main

import (
	"fmt"
	"log"
	"os"

	"github.com/RivasCVA/gpt-messenger/webapp-server/pkg/db"
	"github.com/RivasCVA/gpt-messenger/webapp-server/pkg/handlers"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("error loading .env file")
	}

	router := gin.Default()
	database := db.New()
	handler := handlers.New(database)

	router.GET("/user/:id", handler.GetUserInfo)

	host := os.Getenv("HOST")
	port := os.Getenv("PORT")
	router.Run(fmt.Sprintf("%s:%s", host, port))
}
