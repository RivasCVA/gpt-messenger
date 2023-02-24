package openai

import (
	"context"
	"os"

	gpt "github.com/sashabaranov/go-gpt3"
)


type OpenAIClient struct {
	context	context.Context
	*gpt.Client
}

func New(ctx context.Context) *OpenAIClient {
	token := os.Getenv("OPENAI_TOKEN")
	client := gpt.NewClient(token)
	return &OpenAIClient{ctx, client}
}
