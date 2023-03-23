package main

import (
	"fmt"
	"log"
	"os"

	"github.com/RivasCVA/gpt-messenger/webapp-server/pkg/db"
	"github.com/RivasCVA/gpt-messenger/webapp-server/pkg/handlers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("error loading .env file")
	}

	router := gin.Default()
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowAllOrigins = true
	corsConfig.AddAllowHeaders("Authorization")
	router.Use(cors.New(corsConfig))

	database := db.New()
	handler := handlers.New(database)

	router.POST("/login", handler.Login)
	router.GET("/user", handler.GetUser)
	router.POST("/user", handler.AddUser)
	router.PATCH("/user", handler.UpdateUser)

	host := os.Getenv("HOST")
	port := os.Getenv("PORT")
	router.Run(fmt.Sprintf("%s:%s", host, port))
}
