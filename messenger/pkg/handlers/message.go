package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"

	"github.com/RivasCVA/gpt-messenger/messenger/pkg/constants"
	"github.com/RivasCVA/gpt-messenger/messenger/pkg/models"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"github.com/twilio/twilio-go/twiml"
)

func (h handler) ProcessMessage(c *gin.Context) {
	// Retrieve message text from Twilio request
	var message twiml.MessagingMessage

	if err := c.Bind(&message); err != nil {
		log.Error(err.Error())
		c.String(http.StatusAccepted, constants.PROMPT_SERVER_ERROR)
		return
	}

	messageBody := strings.TrimSpace(message.Body)
	if len(messageBody) == 0 {
		log.Error("empty message")
		c.String(http.StatusAccepted, constants.PROMPT_INVALID_MESSAGE)
		return
	}

	// Verify if user wants help or info
	messageBodyLower := strings.ToLower(messageBody)
	if messageBodyLower == "help" || messageBodyLower == "info" {
		c.String(http.StatusOK, constants.PROMPT_HELP_INFO)
		return
	}

	// Verify if user is subscribed or has trial texts
	phone := message.From
	subscribed, err := h.db.IsUserSubscribed(phone)
	if err != nil {
		log.Error(err.Error())
		c.String(http.StatusAccepted, constants.PROMPT_SERVER_ERROR)
		return
	} else if !subscribed {
		inTrial, newUser, err := h.db.IsUserInTrial(phone)
		if err != nil {
			log.Error(err.Error())
			c.String(http.StatusAccepted, constants.PROMPT_SERVER_ERROR)
			return
		} else if !inTrial {
			c.String(http.StatusAccepted, constants.PROMPT_SUBSCRIPTION_NEEDED)
			return
		} else if newUser {
			// Send new user prompt along with the other response
			c.String(http.StatusOK, fmt.Sprintf("%s\n\n", constants.PROMPT_NEW_USER))
		}
	}

	// Prepare prompt by converting to byte array
	gptPrompt := models.GPTPrompt{
		Body: messageBody,
	}
	gptPromptData, err := json.Marshal(gptPrompt)
	if err != nil {
		log.Error(err.Error())
		c.String(http.StatusAccepted, constants.PROMPT_SERVER_ERROR)
		return
	}

	// Make gpt request to obtain answer
	gptHost := os.Getenv("GPT_HOST")
	gptPort := os.Getenv("GPT_PORT")

	resp, err := http.Post(
		fmt.Sprintf("http://%s:%s/prompt", gptHost, gptPort),
		"application/json",
		bytes.NewBuffer(gptPromptData),
	)
	if err != nil {
		log.Error(err.Error())
		c.String(http.StatusAccepted, constants.PROMPT_SERVER_ERROR)
		return
	}

	// Pull answer into byte array
	responseBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Error(err.Error())
		c.String(http.StatusAccepted, constants.PROMPT_SERVER_ERROR)
		return
	}

	// Convert answer to Go struct
	var gptAnswer models.GPTAnswer
	if err := json.Unmarshal(responseBody, &gptAnswer); err != nil {
		log.Error(err.Error())
		c.String(http.StatusAccepted, constants.PROMPT_SERVER_ERROR)
		return
	}
	gptAnswerBody := strings.TrimSpace(gptAnswer.Body)

	// Send answer text back to user
	log.WithFields(log.Fields{
		"prompt": messageBody,
		"answer": gptAnswerBody,
	}).Info("new prompt & answer")
	c.String(http.StatusOK, gptAnswerBody)
}
