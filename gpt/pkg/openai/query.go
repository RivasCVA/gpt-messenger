package openai

import (
	"strings"

	gpt "github.com/sashabaranov/go-gpt3"
)

func (client *OpenAIClient) GetAnswer(prompt string) (ans string, err error) {
	req := gpt.CompletionRequest{
		Model: gpt.GPT3TextDavinci001,
		MaxTokens: 500,
		Prompt: prompt,
	}

	resp, err := client.CreateCompletion(client.context, req)
	if err != nil {
		return "", err
	}
	
	return strings.TrimSpace(resp.Choices[0].Text), nil
}
